# CloudGeeks - Internal Linking SEO Audit

**Date**: January 13, 2026
**Status**: Requires Investigation - Different Architecture

---

## Executive Summary

**Architecture**: React SPA with Ghost CMS blog integration

**Current State**:
- Blog managed separately via Ghost CMS
- Main website built with React (SPA architecture)
- Different linking strategy required compared to static sites

**Challenge**: Ghost CMS and React SPA require different internal linking approach than Astro static sites.

---

## Architecture Analysis

### Main Website (React SPA):
- Location: `/Users/ashishganda/Development/cloudgeeks-website/`
- Technology: React-based single-page application
- Service pages: Built into React components
- Navigation: Client-side routing

### Blog (Ghost CMS):
- Managed separately from main React application
- Likely hosted on subdomain or `/blog/` path
- Content managed via Ghost admin interface
- Different content management system

---

## Internal Linking Challenges

### 1. Cross-Platform Linking
**Issue**: Ghost CMS blog posts need to link back to React SPA service pages

**Solution Options**:
- Add internal links in Ghost post content manually
- Use Ghost's Code Injection feature to add related links footer
- Create custom Ghost theme that includes service page CTAs

### 2. React SPA to Blog
**Issue**: React service pages need to link to relevant Ghost blog posts

**Solution Options**:
- Fetch Ghost API to display related posts on service pages
- Manually maintain list of blog post URLs in React components
- Create "Latest Posts" or "Related Articles" component using Ghost API

### 3. Blog-to-Blog Cross-Linking
**Issue**: Ghost posts should cross-reference each other

**Solution Options**:
- Use Ghost's internal linking features within editor
- Add "Related Posts" via Ghost theme customization
- Manual internal linking in post content

---

## Recommended Implementation Strategy

### Phase 1: Audit Current State (Week 1)

1. **Identify Ghost blog location**:
   - Determine if blog is at `cloudgeeks.com.au/blog/` or separate subdomain
   - List all existing blog posts in Ghost

2. **Map service pages to blog topics**:
   - Identify which React service pages exist
   - Determine which blog topics relate to each service

3. **Check existing internal links**:
   - Review sample blog posts for internal linking
   - Check React pages for blog post links

### Phase 2: Ghost CMS Configuration (Week 2-3)

1. **Add Service Page Links to Blog Posts**:

   Use Ghost's Code Injection (Settings → Code Injection) to add footer to all posts:

   ```html
   <div class="related-services" style="background: #f5f5f5; padding: 2rem; margin: 3rem 0; border-radius: 8px;">
     <h3>Related Services</h3>
     <ul style="list-style: none; padding: 0;">
       <li>🔹 <a href="https://cloudgeeks.com.au/services/cloud-migration/">Cloud Migration Services</a></li>
       <li>🔹 <a href="https://cloudgeeks.com.au/services/devops/">DevOps Consulting</a></li>
       <li>🔹 <a href="https://cloudgeeks.com.au/contact/">Contact Our Team</a></li>
     </ul>
   </div>
   ```

2. **Create Post-Specific CTAs**:

   Add contextual CTAs within blog post content:

   ```html
   Need help with AWS migration? Learn more about our
   <a href="https://cloudgeeks.com.au/services/aws-migration/">AWS migration services</a>.
   ```

3. **Enable Internal Linking in Ghost**:
   - Use Ghost's `@` mention feature to link between posts
   - Add "Related Posts" section using Ghost Cards feature

### Phase 3: React Integration (Week 3-4)

1. **Add Blog Feed to Service Pages**:

   Create React component that fetches from Ghost Content API:

   ```javascript
   // BlogFeed.jsx
   const BlogFeed = ({ tag, limit = 3 }) => {
     const [posts, setPosts] = useState([]);

     useEffect(() => {
       fetch(`https://cloudgeeks.com.au/ghost/api/v3/content/posts/?key=YOUR_KEY&filter=tag:${tag}&limit=${limit}`)
         .then(res => res.json())
         .then(data => setPosts(data.posts));
     }, [tag]);

     return (
       <div className="related-blog-posts">
         <h3>Related Articles</h3>
         {posts.map(post => (
           <article key={post.id}>
             <h4><a href={post.url}>{post.title}</a></h4>
             <p>{post.excerpt}</p>
           </article>
         ))}
       </div>
     );
   };
   ```

2. **Add to Service Pages**:

   ```javascript
   // Example: AWS Migration service page
   <BlogFeed tag="aws" limit={3} />
   ```

### Phase 4: Ghost Theme Customization (Month 2)

If Ghost theme access is available:

1. **Add Related Posts Section**:

   Edit `post.hbs` template:

   ```handlebars
   {{!-- After post content --}}
   <section class="related-posts">
     <h3>Related Articles</h3>
     {{#get "posts" filter="tag:{{primary_tag.slug}}" limit="3"}}
       {{#foreach posts}}
         <article>
           <h4><a href="{{url}}">{{title}}</a></h4>
           <p>{{excerpt}}</p>
         </article>
       {{/foreach}}
     {{/get}}
   </section>
   ```

2. **Add Service Links Sidebar**:

   Create `partials/services-cta.hbs`:

   ```handlebars
   <aside class="services-sidebar">
     <h3>Our Services</h3>
     <nav>
       <a href="/services/cloud-migration/">Cloud Migration</a>
       <a href="/services/devops/">DevOps</a>
       <a href="/services/kubernetes/">Kubernetes</a>
       <a href="/contact/">Get in Touch</a>
     </nav>
   </aside>
   ```

---

## Priority Matrix

### 🔴 Critical Priority (Week 1):
1. Audit current Ghost blog structure and posts
2. Map service pages to blog content
3. Identify Ghost admin access level

### 🟡 High Priority (Week 2-3):
4. Add service page links to blog posts via Code Injection
5. Manually add internal links to high-traffic blog posts
6. Create React component to display blog posts on service pages

### 🟢 Medium Priority (Month 2):
7. Implement Ghost Content API integration in React
8. Add "Latest Posts" section to React homepage
9. Customize Ghost theme (if access available)

### 🔵 Long-term (Month 3+):
10. Create automated related posts system
11. Implement blog post tagging strategy for better categorization
12. Add contextual CTAs based on user behavior

---

## Service Pages (React) ↔ Blog Topics Mapping

### Cloud Migration Service:
**Should link to blog posts about**:
- AWS migration guides
- Cloud cost optimization
- Migration case studies
- Cloud security best practices

### DevOps Service:
**Should link to blog posts about**:
- CI/CD pipelines
- Infrastructure as Code
- DevOps tools and best practices
- Automation strategies

### Kubernetes Service:
**Should link to blog posts about**:
- Kubernetes deployment guides
- Container orchestration
- K8s security
- Microservices architecture

### AWS Service:
**Should link to blog posts about**:
- AWS services overview
- Cost optimization
- AWS architecture patterns
- Serverless computing

---

## Ghost CMS Specific Recommendations

### 1. Use Ghost Tags Effectively:
```
- aws
- kubernetes
- devops
- cloud-migration
- security
- tutorials
- case-studies
```

### 2. Create Tag-Based Navigation:
- `/blog/tag/aws/` - All AWS posts
- `/blog/tag/kubernetes/` - All K8s posts
- Link to these tag archives from service pages

### 3. Internal Linking Best Practices in Ghost:
- Use the `@` symbol in Ghost editor to link to other posts
- Add "Read more about..." callouts with internal links
- Include 2-3 internal links per 1000 words
- Link from newer posts to older evergreen content

### 4. Code Injection Zones:
- **Site Header**: Add consistent CTA bar
- **Site Footer**: Add service page links
- **Post Footer**: Add related services widget

---

## Expected SEO Impact

**After Implementation**:
- Improved crawl depth from blog to service pages
- Better distribution of link equity from blog content (often higher DA)
- Increased conversion rate from blog readers to service inquiries
- Enhanced topic authority clustering around service offerings

**Estimated Gains**:
- 20-30% improvement in service page rankings
- 25-35% increase in blog-to-service conversion rate
- Better indexing of service pages via blog internal links
- Increased organic visibility for "[service] + blog/guide" queries

---

## Next Steps

1. ✅ Audit completed (architecture identified)
2. ⏳ Access Ghost admin to review current blog structure
3. ⏳ Identify all service pages in React app
4. ⏳ Create service-to-blog mapping document
5. ⏳ Begin Phase 1: Code Injection internal linking
6. ⏳ Begin Phase 2: React blog feed integration
7. ⏳ Consider Ghost theme customization (if feasible)

---

## Technical Notes

**Ghost Content API Endpoint**:
```
https://cloudgeeks.com.au/ghost/api/v3/content/posts/
```

**React Component Locations** (need to identify):
- Service page components
- Homepage component
- Navigation component

**Ghost Admin Access Required For**:
- Code Injection
- Manual post editing for internal links
- Tag structure optimization
- Theme customization (if self-hosted)

---

**Audit conducted by**: Claude Sonnet 4.5
**Architecture**: React SPA + Ghost CMS (different from Astro static sites)
**Note**: Implementation requires Ghost admin access + React codebase updates
