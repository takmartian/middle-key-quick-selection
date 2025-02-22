// 获取菜单和所有圆形元素，以及状态显示元素
const menu = document.getElementById('menu');
const circles = document.querySelectorAll('.circle');
const status = document.getElementById('status');
let selectedCircle = null;
let animationInProgress = false;

// 监听鼠标按下事件
document.body.addEventListener('mousedown', (e) => {
    if (e.button === 1) { // 判断是否为中间键按下
        e.preventDefault(); // 阻止默认行为
        // 显示菜单并设置其位置
        menu.style.display = 'block';
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;
        animationInProgress = true;
        // 触发圆形的飞出动画
        circles.forEach(circle => {
            circle.classList.remove('fly-in');
            circle.classList.add('fly-out');
            circle.classList.add('no-hover'); // 禁用hover效果
        });
        // 等待飞出动画结束后解除禁用hover效果
        setTimeout(() => {
            circles.forEach(circle => {
                circle.classList.remove('no-hover');
            });
            animationInProgress = false;
        }, 200); // 动画持续时间为200ms
        // 添加鼠标移动监听器
        document.addEventListener('mousemove', onMouseMove);
    }
});

// 监听鼠标抬起事件
document.body.addEventListener('mouseup', (e) => {
    if (e.button === 1) { // 判断是否为中间键抬起
        document.removeEventListener('mousemove', onMouseMove); // 移除鼠标移动监听器
        // 触发圆形的飞入动画
        circles.forEach(circle => {
            circle.classList.remove('fly-out');
            circle.classList.add('fly-in');
            circle.classList.add('no-hover'); // 禁用hover效果
        });
        // 动画结束后隐藏菜单并标记选择的圆形
        setTimeout(() => {
            menu.style.display = 'none';
            if (selectedCircle) {
                circles.forEach(circle => circle.classList.remove('red'));
                selectedCircle.classList.add('red');
                status.textContent = `第${selectedCircle.textContent}个圆形被选中`;
            } else {
                status.textContent = '未选中';
            }
            circles.forEach(circle => {
                circle.classList.remove('no-hover'); // 恢复hover效果
            });
        }, 200); // 动画持续时间为200ms
    }
});

// 处理鼠标移动事件
function onMouseMove(e) {
    if (animationInProgress) return; // 如果动画进行中则直接返回
    let isOverCircle = false;
    circles.forEach(circle => {
        const rect = circle.getBoundingClientRect(); // 获取圆形的位置和尺寸
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            isOverCircle = true;
            selectedCircle = circle;
        }
        circle.classList.toggle('red', isOverCircle && selectedCircle === circle); // 高亮当前悬停的圆形
    });
}
