import { Suspense } from 'react';

function BlogPage() {
  return (
    <Suspense fallback="Loading...">
      <div className="w-[90%] bg-blue-600 h-[1000px]">sadishd</div>
    </Suspense>
  );
}

export default BlogPage;
