class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }

    // 新增的寻宝情节：寻找开启神庙的钥匙
    static findTempleKey(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("钥匙被隐藏在深不可测的洞穴中...");
                }
                resolve("在一片神秘的花园中找到了开启神庙的钥匙!");
            }, 1500);
        });
    }

    // 新增的寻宝情节：解开箱子上的魔法封印
    static unsealTreasureBox(box) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) {
                    reject("魔法封印过于强大，无法解开...");
                }
                resolve("成功解开封印，宝藏即将显现...");
            }, 2000);
        });
    }
}

async function findTreasureWithAsyncAwait() {
    try {
        const initialClue = await TreasureMap.getInitialClue();
        displayTreasureHuntProgress(initialClue);

        const location = await TreasureMap.decodeAncientScript(initialClue);
        displayTreasureHuntProgress(location);

        const templeKey = await TreasureMap.findTempleKey(location);
        displayTreasureHuntProgress(templeKey);

        const box = await TreasureMap.searchTemple(location);
        displayTreasureHuntProgress(box);

        const unsealedBox = await TreasureMap.unsealTreasureBox(box);
        displayTreasureHuntProgress(unsealedBox);

        const treasure = await TreasureMap.openTreasureBox();
        displayTreasureHuntProgress(treasure);
    } catch (error) {
        displayTreasureHuntProgress(`任务失败: ${error}`);
    }
}

function displayTreasureHuntProgress(text) {
    const messageBoard = document.getElementById('status-message');
    const progressBar = document.getElementById('progress');
    messageBoard.textContent = text;
    progressBar.style.width = '+=10%';
}

// 运行寻宝过程并展示动画
findTreasureWithAsyncAwait().then(() => {
    displayTreasureHuntProgress("寻宝完成！");
}).catch(error => {
    displayTreasureHuntProgress(`发生错误：${error}`);
});
