$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message__message-box">
          <div class="chat-main__message__message-box__MessageInfo">
            <div class="chat-main__message__message-box__MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="chat-main__message__message-box__MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__message-box__content">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message__message-box">
          <div class="chat-main__message__message-box__MessageInfo">
            <div class="chat-main__message__message-box__MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="chat-main__message__message-box__MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__message-box__content">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message').append(html); 
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});    
      $('.new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })    
  });
});