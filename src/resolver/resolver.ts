import { Resolvers } from "../types";


export const resolvers : Resolvers = {
  Query: {
    posts: (_, __, {dataSources, user}) => {
      // if (!user) throw new Error("Not authenticated");
      // if (user.role !== "ADMIN") throw new Error("Forbidden");
      // if (!user) {
      //   throw new Error("Not authenticated");
      // }
      // if (user?.role!=='ADMIN') {
      //   throw new Error("Not authenticated");
      // }
      return dataSources.postAPI.getAllPosts();
    },
    post: (_, { id }, {dataSources}) => {

      const post =  dataSources.postAPI.getPostById(id);

      if(!post) throw new Error('Post not found')

      return post
    }
  },
  // Review: {
  //   post: (review) => {
  //     if (!review.postId) return null;
  //     return {
  //       __typename: "Post",
  //       id: review.postId,
  //     };
  //   },
  //   user: (review) => {
  //     if (!review.userId) return null;
  //     return {
  //       __typename: "User",
  //       id: review.userId,
  //     };
  //   },
  // },

  // User: {
  //   reviewsByUser: ( user, _, {dataSources}) => {    //( {id}, _, {dataSources})
  //     if (!user.id) return [];
  //     return dataSources.reviewAPI.getReviewsByUser(user.id);
  //   },
   
  // },
  // Post: {
  //   reviewsForPost: ( {id}, _, {dataSources}) => {     //( post, _, {dataSources})
  //     if (!id) return [];                               //if (!post.id) return [];
  //     return dataSources.reviewAPI.getReviewsByPost(id);  //getReviewsByPost(post.id)
  //   },
   
  // },

   Mutation: {
    createPost: (_,{ input },{ dataSources }) => {
      return dataSources.postAPI.createPost(input);
    },

  //   updateReview: (_,{ id, input },{ dataSources }) => {
  //     return dataSources.reviewAPI.updateReview(id, input);
  //   },

  //    deleteReview: (_,{ id },{ dataSources }
  //   ) => {
  //     return dataSources.reviewAPI.deleteReview(id);
  //   },
  },
  
};