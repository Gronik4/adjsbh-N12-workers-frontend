import CreateContent from './createContent';
import Worker from './sw';

export default class App {
  constructor() {
    this.pms = document.getElementById('pms');

    this.init();
  }

  static url = 'http://localhost:8080';

  init() {
    this.hendlerProgress();

    window.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('./service-worker.js').then((reg) => {
          console.log('Регистрация ws сработала', reg.scope);
        }).catch((err) => {
          console.log('Ошибка регистрации ws = ', err);
        });
      }
    });
    // const worker = new Worker();
    /* worker.addEventListener('message', ({ data: result }) => {
      console.log(result);
    }); */
  }

  hendlerProgress() {
    document.querySelectorAll('.brick').forEach((item) => item.remove());
    for (let i = 0; i < 3; i += 1) {
      const contentProgress = new CreateContent('progress').createProgress();
      this.pms.append(contentProgress);
      this.pms.classList.remove('error');
    }
  }
}
