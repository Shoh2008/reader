let opener = document.getElementById('opener');
let adder = document.getElementById('adder');
let modal = document.getElementById('modal');
let copy_box = document.getElementById('copy_box');
let texts = document.getElementById('texts');
let textarea = document.getElementById('textarea');

let array = [];
let text_value = '';

window.addEventListener('load', () => updata());
textarea.addEventListener('keyup', (e) => text_value = e.target.value);
opener.addEventListener('click', () => {
    modal.style.top = '50%';
    textarea.focus();
});
function updata() {
    let store = localStorage.getItem('TextArray');
    let data = JSON.parse(store);
    let response = data.map((item, index) => `<div class="text">
        ${item.value}
        <div class="actions">
            <button onclick={edited(${index})}>✍</button>
            <button onclick={deleted(${index})}>🔪</button>
            <button onclick={readed(${index})}>🔊</button>
            <button onclick={copyed(${index})}>💾</button>
        </div>
    </div>`).join('');
    texts.innerHTML = response;
};
adder.addEventListener('click', () => {
    if (textarea.value || text_value) {
        let store = localStorage.getItem('TextArray');
        let data = JSON.parse(store);
        localStorage.setItem('TextArray', JSON.stringify(array));
        data.push({ value: text_value });
        localStorage.setItem('TextArray', JSON.stringify(data));
        updata();
    };
    modal.style.top = '-50%';
    textarea.value = '';
});
function edited(index) {
    let store = localStorage.getItem('TextArray');
    let data = JSON.parse(store);
    textarea.value = data[index]?.value;
    data.splice(index, 1);
    modal.style.top = '50%';
    localStorage.setItem('TextArray', JSON.stringify(data));
    updata();
};
function deleted(index) {
    let store = localStorage.getItem('TextArray')
    let data = JSON.parse(store);
    data.splice(index, 1);
    localStorage.setItem('TextArray', JSON.stringify(data));
    updata();
};
function readed(index) {
    let store = localStorage.getItem('TextArray');
    let data = JSON.parse(store);
    let msg = new SpeechSynthesisUtterance(data[index].value);
    let voicesArray = speechSynthesis.getVoices();
    msg.voice = voicesArray[1];
    speechSynthesis.speak(msg);
};
function copyed(index) {
    let store = localStorage.getItem('TextArray');
    let data = JSON.parse(store);
    let text_for_copy = data[index].value;
    navigator.clipboard.writeText(text_for_copy);
    let num = 3;
    let inter = setInterval(() => {
        if (num > 0) { copy_box.style.bottom = '5px'; } else {
            copy_box.style.bottom = '-50%';
            clearInterval(inter);
        };
        num -= 1;
    }, 500);
};