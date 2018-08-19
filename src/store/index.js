import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from '@/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: sourceData,
  getters: {

  },
  actions: {
    createPost(context, post) {
      const postId = `greatPost-${Math.random()}`;
      post['.key'] = postId;
      context.commit('setPost', { postId, post });
      context.commit('appendPostToThread', { postId, threadId: post.threadId });
      context.commit('appendPostToUser', { postId, userId: post.userId });
    },
  },
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    },
  },
});
