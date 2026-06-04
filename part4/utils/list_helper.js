

const dummy = (blogs) => {
    return 1
}

sumTotalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total = total + blog.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    let mostLiked = blogs[0]
    let maxLikes = 0
    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            mostLiked = blog
        }
    });
    return mostLiked
}

module.exports = {
    dummy,
    sumTotalLikes,
    favoriteBlog
}