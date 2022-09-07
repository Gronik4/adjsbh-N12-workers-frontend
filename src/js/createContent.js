export default class CreateContent {
  constructor(timeStamp, discription, flag) {
    this.ts = timeStamp;
    this.dn = discription;
    this.fl = flag;
  }

  createText() {
    const brick = document.createElement('div');
    brick.className = 'brick';
    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = this.getDate();
    brick.append(date);
    const box = document.createElement('div');
    box.className = 'box';
    const scuare = document.createElement('div');
    scuare.className = 'box_scuare';
    box.append(scuare);
    const text = document.createElement('p');
    text.className = 'box_text';
    text.textContent = this.dn;
    box.append(text);
    brick.append(box);
    return brick;
  }

  getDate() {
    const dat = new Date(this.ts);
    const year = `${dat.getFullYear()}`;
    const month = dat.getMonth() < 10 ? `0${dat.getMonth()}` : `${dat.getMonth()}`;
    const day = dat.getDate() < 10 ? `0${dat.getDate()}` : `${dat.getDate()}`;
    const haurs = dat.getHours() < 10 ? `0${dat.getHours()}` : `${dat.getHours()}`;
    const minut = dat.getMinutes() < 10 ? `0${dat.getMinutes()}` : `${dat.getMinutes()}`;
    const result = `${haurs}:${minut} ${day}.${month}.${year}`;
    return result;
  }

  createProgress() {
    const brick = document.createElement('div');
    brick.className = 'brick';
    const date = document.createElement('p');
    date.className = 'date_progress';
    if (this.fl === 'err') { date.classList.add('err'); }
    brick.append(date);
    const box = document.createElement('div');
    box.className = 'box';
    const scuare = document.createElement('div');
    scuare.className = 'box_scuare_progress';
    if (this.fl === 'err') { scuare.classList.add('err'); }
    box.append(scuare);
    const boxP = document.createElement('div');
    boxP.className = 'boxP';
    const text = document.createElement('div');
    text.className = 'box_text_progress';
    if (this.fl === 'err') { text.classList.add('err'); }
    const text1 = document.createElement('div');
    text1.className = 'box_text_progress';
    if (this.fl === 'err') { text1.classList.add('err'); }
    boxP.append(text);
    boxP.append(text1);
    box.append(boxP);
    brick.append(box);
    return brick;
  }
}
