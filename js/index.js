
$(function(){
    //保存自定义视频封面图片
    $("#transCodeId").on("click", function() {

        $(this).val('转码中,请稍候...');

        var videoUrls = new Array();
        var videoUrl = $("#url").val();
        if(videoUrl != '') {
            videoUrls.push(videoUrl);
        }
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);

        if(videoUrls != null && videoUrls.length > 0) {
            $.ajax({
                type: "POST",
                url: 'http://192.168.1.33:8080/transcode-server/action/transcodeurl?account=5555&ratio=320*240',
                contentType:'application/json; charset=utf-8',
                data:JSON.stringify(videoUrls),
                cache:false,
                error: function(XMLHttpRequest, textStatus, errorThrown){

                },
                success: function(json){
                    $('#transCodeId').val('开始转码');
                    console.info(JSON.stringify(json));
                    $("#showTransCode").show();
                    $.each(json.list, function (i, v) {
                        $('#picUrl').attr('href', v.pic_url);
                        $('#picUrl').html(v.pic_url);
                        $('#videoUrl').attr('href', v.video_url);
                        $('#videoUrl').html(v.video_url);
                        $("#showPic").attr('src',v.pic_url);
                    });
                }
            });
        } else {
            $.ajax({
                url: 'http://192.168.1.33:8080/transcode-server/action/transcodefile?account=5555&ratio=320*240',
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                },
                success: function (json) {
                    $('#transCodeId').val('开始转码');
                    console.info(JSON.stringify(json));
                    $("#showTransCode").show();
                    $.each(json.list, function (i, v) {
                        $('#picUrl').attr('href', v.pic_url);
                        $('#picUrl').html(v.pic_url);
                        $('#videoUrl').attr('href', v.video_url);
                        $('#videoUrl').html(v.video_url);
                        $("#showPic").attr('src',v.pic_url);
                    });
                }
            })
        }
    });
})
