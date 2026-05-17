

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

module.exports = {
    dummy,
    sumTotalLikes
}