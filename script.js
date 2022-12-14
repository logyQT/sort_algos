const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ALT_DOWN = false;

let numbers = new Array();
for (let i = 0; i < 360; i++) {
    numbers.push(i);
}
const sort_circle = document.querySelector("div.circle");
for (let i = 0; i < 360; i++) {
    const span = document.createElement("span");
    span.classList.add("circle");
    span.classList.add(`index${i}`);
    span.style.setProperty("--deg", i);
    span.style.setProperty("--hue", numbers[i]);
    sort_circle.append(span);
}

const shuffle = async (arr) => {
    for (let j = 0; j < numbers.length * Math.sqrt(numbers.length); j++) {
        const i1 = Math.floor(Math.random() * 360);
        const i2 = Math.floor(Math.random() * 360);

        [arr[i1], arr[i2]] = [arr[i2], arr[i1]];

        update(i1);
        update(i2);
    }
};
const bubbleSort = async () => {
    if (ALT_DOWN === false) {
        for (let j = 0; j < numbers.length; j++) {
            let swap = false;
            for (let i = 0; i < numbers.length - 1 - j; i++) {
                if (numbers[i] > numbers[i + 1]) {
                    swap = true;

                    [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];

                    update(i);
                    update(i + 1);
                }
            }
            await sleep(1);
            if (swap === false) {
                break;
            }
        }
    } else {
        for (let j = 0; j < numbers.length; j++) {
            let swap = false;
            for (let i = 0; i < numbers.length - 1 - j; i++) {
                if (numbers[i] < numbers[i + 1]) {
                    swap = true;

                    [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];

                    update(i);
                    update(i + 1);
                }
            }
            await sleep(1);
            if (swap === false) {
                break;
            }
        }
    }
};
const selectionSort = async () => {
    for (let j = 0; j < numbers.length; j++) {
        let min = j;
        for (let i = j; i < numbers.length; i++) {
            if (numbers[i] < numbers[min]) {
                min = i;
            }
        }
        if (min != j) [numbers[j], numbers[min]] = [numbers[min], numbers[j]];
        update(j);
        update(min);
        await sleep(1);
    }
};

const quickSort = async (arr, high = 0, low = arr.length - 1) => {
    if (low < high) {
        const pivot = await parition(arr, high, low);
        await quickSort(arr, low, pivot);
        await quickSort(arr, pivot + 1, high);
    }
};

const update = (i) => {
    document.querySelector(`span.index${i}`).style.setProperty("--hue", numbers[i]);
};

const shuffleButton = document.querySelector("button.shuffle");
const sortButton = document.querySelector("button.bubble_sort");
const selectionSortButton = document.querySelector("button.selection_sort");
const quicksortButton = document.querySelector("button.quick_sort");

shuffleButton.addEventListener("click", () => shuffle(numbers));
sortButton.addEventListener("click", bubbleSort);
selectionSortButton.addEventListener("click", selectionSort);
quicksortButton.addEventListener("click", async () => {
    await quickSort(numbers);
});

document.addEventListener("keydown", (e) => {
    ALT_DOWN = e.altKey;
});
document.addEventListener("keyup", (e) => {
    ALT_DOWN = e.altKey;
});

shuffle(numbers);
