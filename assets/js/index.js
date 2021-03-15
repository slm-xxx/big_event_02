$(function () {
    // 1.获取基本信息
    getUserInfo()

    // 2.退出功能
    var layer = layui.layer
    $("#btnLogout").on("click", function () {
        // 框架提供的询问框
        layer.confirm('是否确认退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1.清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html"
            // 3.关闭询问框
            layer.close(index)
        })
    })
})
// 后面其他的页面还要调用  -- 后面需要用到，因此封装在外面
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为token过期事件 12小时
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".tetx-avatar").hide()
    } else {
        // 3.2 渲染文本头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".tetx-avatar").show().html(text)
    }
}