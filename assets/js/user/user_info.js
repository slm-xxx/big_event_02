$(function () {
    // 1.自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6个字符之间"
            }
        }
    })

    // 2.获取用户所有信息，渲染列表
    formUserInfo()
    // 导出layer
    var layer = layui.layer

    function formUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            data: {},
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                // 获取失败，弹出提示
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // v成功渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.表单重置
    $("#btnReset").on('click', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 重新渲染列表
        formUserInfo()
    })

    // 4.修改用户信息
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败")
                }
                layer.msg("恭喜您，用户信息修改成功")
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})