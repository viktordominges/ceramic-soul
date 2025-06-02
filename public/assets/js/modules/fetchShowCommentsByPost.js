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

            fetchDeleteComment({
                contextId: postId,
                contextType: 'post',
                renderFn: renderItemFn,
                showEmptyFn: showEmptyMessageFn
            });

            // Если fetchUpdateComment ожидает renderFn и showEmptyFn, передать их тоже:
            // fetchUpdateComment(postId, renderItemFn, showEmptyMessageFn);
            fetchUpdateComment(postId);

        } else {
            showEmptyMessageFn(commentsListWrapper, 'There are no comments yet.');
        }
    } catch (error) {
        console.error('Error loading post comments:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessageFn(commentsListWrapper, 'Error loading post comments.');
    }
}
