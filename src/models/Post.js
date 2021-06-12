export default class Post{
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
