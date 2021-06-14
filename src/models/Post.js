/**
 * Data class for Posts. This class stores the data structure of the posts.
 * @export
 */
export class Post{

    /**
     * This is the constructor for Post class that accepts the Post data.
     *
     * @param {{id:string, title:string, body:string, location:string, timestamp:string, author:string, keywords:string}} data - Post data object
     * @constructor
     * @example
     *
     * let obj = new Post({
     *                  id:"id",
     *                  title: "title",
     *                  body: "body",
     *                  location: "location",
     *                  timestamp: "timestamp",
     *                  author: "author",
     *                  keywords: "keywords"})
     *
     * @author amannirala13
     */
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.body= data.body;
        this.location = data.location;
        this.timestamp = data.timestamp;
        this.author = data.author;
        this.keywords = data.keywords;
    }
}
