//split essay into isolated lines
function parse_content(){
    $('.line', $('#tbl_parse')).remove();   //clear existing data
    var content_vi = $('#txt_content_vi').val();
    var splits_vi = content_vi.split('.');
    var content_en = $('#txt_content_en').val();
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
function copy_all(){
    $('#div_copied').hide();
    var all = $('.txt_typing');
    var len = all.length;
    if (len > 1){
        var copied_text = [];
        for (var i=1; i<len; i++){
            copied_text.push($.trim($(all[i]).val()));
        }
        navigator.clipboard.writeText(copied_text.join('. '));
        $('#div_copied').show();
    }
}