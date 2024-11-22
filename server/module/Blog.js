const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  content: String,
  createdAt: {
    type:Date,
    default: Date.now
  },
  updatedAt: {
    type:Date,
    default:Date.now
  }

});
const kittenClan = new Schema({
  name:String,
  type:String
});



module.exports = mongoose.model('Blog',blogSchema);

// const Blog = model('Blog', blogSchema);

// export default Blog;