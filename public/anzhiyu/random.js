var posts=["posts/3dsd.html","posts/b7fc.html","posts/3eeb.html","posts/0.html","posts/3emd.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};