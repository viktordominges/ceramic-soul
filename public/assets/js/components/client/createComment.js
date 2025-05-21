
    
export function fetchCreateComment() {

    const addCommentTrigger = document.querySelector('#add-comment-btn');

    addCommentTrigger.addEventListener('click',  (e) => {
        e.preventDefault();

        // Получаем id поста из дата-атрибута
        const postElement = document.querySelector('.single-post__item');
        const postId = parseInt(postElement.dataset.postId, 10); // обязательно число

        // Получаем текст комментария
        const commentText = document.querySelector('#comment-textarea').value;

        fetch('/api/comments/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: postId,
                text: commentText
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Ошибка:', data.error);
                alert('Ошибка: ' + data.error);
            } else {
                console.log('Комментарий успешно отправлен:', data);
                alert('Комментарий добавлен!');
                // Очистка формы
                document.querySelector('#comment-textarea').value = '';
            }
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при отправке комментария');
        });
    });

}