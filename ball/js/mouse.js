document.addEventListener('DOMContentLoaded', function() {
    const monsterCursor = document.getElementById('mouse');
    let lastX = 0;
    let lastY = 0;

    window.addEventListener('mousemove', (e) => {
        const newX = e.clientX;
        const newY = e.clientY;
        const angle = Math.atan2(newY - lastY, newX - lastX) * 180 / Math.PI;

        // 设置图片的中心与鼠标位置对齐
        monsterCursor.style.left = `${newX - monsterCursor.offsetWidth / 2}px`;
        monsterCursor.style.top = `${newY - monsterCursor.offsetHeight / 2}px`;
        monsterCursor.style.transform = `rotate(${angle}deg)`;
        monsterCursor.style.visibility = 'visible';

        lastX = newX;
        lastY = newY;
    });
});
