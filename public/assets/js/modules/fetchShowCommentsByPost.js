
// import { renderPostComment } from "../components/client/renderPostComment.js";
// import { showEmptyMessage } from "../components/client/showEmptyMessage.js";
import { fetchDeleteComment } from "./fetchDeleteComment.js";
import { fetchUpdateComment } from "./fetchUpdateComment.js";

export async function fetchShowCommentsByPost(postId, commentsListWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/comments/post/${encodeURIComponent(postId)}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Error loading post comments: ${response.status}`);
        }

        const data = await response.json();
        const comments = Array.isArray(data) ? data : data.content;

        commentsListWrapper.innerHTML = '';

        if (Array.isArray(comments) && comments.length) {
            comments.slice().reverse().forEach(comment => {
                commentsListWrapper.appendChild(renderItemFn(comment));
            });

            fetchDeleteComment(postId, renderItemFn, showEmptyMessageFn);
            fetchUpdateComment(postId); // Можно тоже сделать универсальной при необходимости
        } else {
            showEmptyMessageFn(commentsListWrapper, 'There are no comments yet.');
        }
    } catch (error) {
        console.error('Error loading post comments:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessageFn(commentsListWrapper, 'Error loading post comments.');
    }
}