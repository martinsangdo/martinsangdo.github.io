//constants
const LOCAL_KEY = 'translating_key';    //translating texts
const LOCAL_KEY_VI = 'writing_key_vi';  //original VI texts
const LOCAL_KEY_EN = 'writing_key_en';  //original EN texts


//split essay into isolated lines
function parse_content(){
    $('.line', $('#tbl_parse')).remove();   //clear existing data
    var content_vi = $('#txt_content_vi').val();
    content_vi = $.trim(content_vi);
    if (content_vi == ''){
        return;
    }
    var content_en = $.trim($('#txt_content_en').val());
    //save into local storage
    localStorage.setItem(LOCAL_KEY_VI, content_vi);
    localStorage.setItem(LOCAL_KEY_EN, content_en);
    //
    var splits_vi = content_vi.split('.');
    var splits_en = content_en.split('.');
    // console.log(splits_vi);
    var len = splits_vi.length;
    for (var i=0; i<len; i++){
        var $tr = $('#tr_template').clone(false);
        $tr.addClass('line');
        $tr.removeClass('hidden');
        $tr.removeAttr('id');
        $('.text_vi', $tr).val($.trim(splits_vi[i]));
        if (splits_en[i] != ''){
            $('.en_text', $tr).text($.trim(splits_en[i]));
            $('.en_text', $tr).hide();
        }
        $('#tbl_parse').append($tr);
    }
    $('#div_copied').hide();
}

function toggle_en(btn){
    var $parent_td = $(btn).closest('td');
    if ($('.en_text', $parent_td).is(':hidden')){
        $('.en_text', $parent_td).show();
    } else {
        $('.en_text', $parent_td).hide();
    }
}
//show EN
function toggle_all(){
    if ($($('.en_text', $('#tbl_parse'))[1]).is(':hidden')){
        $('.en_text', $('#tbl_parse')).show();
    } else {
        $('.en_text', $('#tbl_parse')).hide();
    }
}
//copy typing texts
function copy_all(is_auto_copy){
    $('#div_copied').hide();
    var all = $('.txt_typing');
    var len = all.length;
    var content = '';
    if (len > 1){
        var copied_text = [];
        for (var i=1; i<len; i++){
            copied_text.push($.trim($(all[i]).val()));
        }
        content = copied_text.join('. ');
        if (content != '' && !is_auto_copy){
            navigator.clipboard.writeText(content);
            $('#div_copied').show();
        }
    }
    return content;
}
//
function clearStorage(){
    localStorage.setItem(LOCAL_KEY, '');
}
//
function saveEditingContent2LocalStore(){
    var content = copy_all(true);
    content = $.trim(content);
    if (content != ''){
        localStorage.setItem(LOCAL_KEY, content);
    }
}
//
function restore_local(){
    var content_vi = localStorage.getItem(LOCAL_KEY_VI, '');
    var content_en = localStorage.getItem(LOCAL_KEY_EN, '');
    if (content_vi != ''){
        $('#txt_content_vi').val(content_vi);
        $('#txt_content_en').val(content_en);
    }
    parse_content();
    //parse the translating text & paste it again
    var translating_content = localStorage.getItem(LOCAL_KEY, '');
    if (translating_content == ''){
        return;
    }
    var texts = translating_content.split('.');
    var all = $('.txt_typing');
    var len = all.length;
    if (len > 1){
        for (var i=1; i<len; i++){
            $(all[i]).val($trim(texts[i-1]));
        }
    }
}
//
$( document ).ready(function() {
    setInterval(saveEditingContent2LocalStore, 10*1000); //auto save writing content every 10 seconds
});
