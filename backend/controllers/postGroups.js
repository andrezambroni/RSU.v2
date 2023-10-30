const Post = require("../models/postGroups");
const User = require("../models/User");

exports.createGroupsPost = async (req, res) => {
  
  console.log(req.body,'req.body');
  try {
    const post = await new Post(req.body).save();
    await post.populate("user", "first_name last_name cover picture username");
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllGroupsPosts = async (req, res) => {
  const category = req?.body?.category;
  console.log(category,'category');
  console.log(req.body,'req.body');
  try {
    const followingTemp = await User.findById(req.user.id).select("following");
    const following = followingTemp.following;
    console.log('parte 1')
    const promises = following.map((user) => {
      return Post.find({ user: user, category:category })
        .populate("user", "first_name last_name picture username cover")
        .populate("comments.commentBy", "first_name last_name picture username")
        .sort({ createdAt: -1 })
        .limit(10);
    });
    
    const followingPosts = await (await Promise.all(promises)).flat();
    const userPostGroups = await Post.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username cover")
      .populate("comments.commentBy", "first_name last_name picture username")
      .sort({ createdAt: -1 })
      .limit(10);
    followingPosts.push(...[...userPostGroups]);
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    console.log(followingPosts, 'Posts de grupo')
    res.json(followingPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};

exports.comment = async (req, res) => {
  try {
    const { comment, image, postGroupsId } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// exports.savePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const user = await User.findById(req.user.id);
//     const check = user?.savedPosts.find(
//       (post) => post.post.toString() == postId
//     );
//     if (check) {
//       await User.findByIdAndUpdate(req.user.id, {
//         $pull: {
//           savedPosts: {
//             _id: check._id,
//           },
//         },
//       });
//     } else {
//       await User.findByIdAndUpdate(req.user.id, {
//         $push: {
//           savedPosts: {
//             post: postId,
//             savedAt: new Date(),
//           },
//         },
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// exports.deletePost = async (req, res) => {
//   try {
//     await Post.findByIdAndRemove(req.params.id);
//     res.json({ status: "ok" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
