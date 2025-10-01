# Card + Link Patterns - Hydration-Safe Implementation

## ✅ **Correct Pattern**

```tsx
// ALWAYS use this pattern to avoid hydration errors
<Link href="/destination" className="block h-full">
  <Card className="h-full">
    <CardContent>
      {/* Your content here */}
    </CardContent>
  </Card>
</Link>
```

**Why this works:**
- Link renders as `<a>`
- Card renders as `<div>` 
- Result: `<a><div>content</div></a>` ✅ Valid HTML

## ❌ **Incorrect Pattern**

```tsx
// NEVER do this - causes hydration errors
<Card className="h-full">
  <Link href="/destination" className="block h-full">
    <div>content</div>
  </Link>
</Card>
```

**Why this fails:**
- Card renders as `<div>`
- Link renders as `<a>`
- Result: `<div><a><div>content</div></a></div>` ❌ Invalid nesting

## 🎯 **Implementation Guidelines**

### 1. **For Clickable Cards**
```tsx
<Link href="/blog/post-slug" className="block h-full">
  <Card className="h-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>{post.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{post.excerpt}</p>
    </CardContent>
  </Card>
</Link>
```

### 2. **For Cards with Multiple Actions**
```tsx
<Card className="h-full">
  <Link href="/blog/post-slug" className="block">
    <CardHeader>
      <CardTitle>{post.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{post.excerpt}</p>
    </CardContent>
  </Link>
  
  {/* Actions outside the main link */}
  <CardFooter className="flex justify-between">
    <Button variant="ghost" size="sm" asChild>
      <Link href={`/blog/${post.slug}/edit`}>Edit</Link>
    </Button>
    <Button variant="ghost" size="sm" asChild>
      <Link href={`/blog/${post.slug}/share`}>Share</Link>
    </Button>
  </CardFooter>
</Card>
```

### 3. **Using asChild Pattern**
```tsx
// For advanced cases where you need the Card to become the Link
<Card asChild className="h-full cursor-pointer hover:shadow-lg">
  <Link href="/destination">
    <CardContent>
      {/* Content that makes the entire card clickable */}
    </CardContent>
  </Link>
</Card>
```

## 🚨 **Common Pitfalls**

1. **Nested Interactive Elements**
   ```tsx
   // ❌ Don't nest buttons inside clickable cards
   <Link href="/post">
     <Card>
       <Button>Click me</Button> {/* Creates nested interactive elements */}
     </Card>
   </Link>
   ```

2. **Missing Block Display**
   ```tsx
   // ❌ Link without block display breaks layout
   <Link href="/post"> {/* Missing className="block" */}
     <Card className="h-full">Content</Card>
   </Link>
   ```

3. **Conditional Rendering Issues**
   ```tsx
   // ❌ Conditional rendering can cause hydration mismatches
   <Card>
     {typeof window !== 'undefined' && <SomeComponent />}
   </Card>
   
   // ✅ Use useEffect or proper SSR handling instead
   <Card>
     <SomeComponent />
   </Card>
   ```

## 🧪 **Testing Strategy**

1. **Visual Regression Tests**
   - Test card hover states
   - Verify link functionality
   - Check responsive behavior

2. **Hydration Tests**
   - Compare server vs client HTML
   - Test with React.StrictMode
   - Use React DevTools Profiler

3. **Accessibility Tests**
   - Verify keyboard navigation
   - Test screen reader compatibility
   - Check focus management

## 📋 **Checklist**

- [ ] Link wraps Card, not vice versa
- [ ] Link has `className="block"` for proper layout
- [ ] No nested interactive elements
- [ ] Proper hover/focus states
- [ ] Accessible keyboard navigation
- [ ] No hydration warnings in console
- [ ] Consistent server/client rendering
