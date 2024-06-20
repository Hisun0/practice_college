# Как работать с гитом

Из-за того, что мы работаем с вами одновременно, нужно понимать, как именно работать вместе. Будем следовать обычному `git flow`. То есть делаем новую ветку из ветки `main`. В вашей новой ветке будет разрабатываться новая фича. После того, как фича разработана делаем пулл реквест в `main`, далее ваш код уходит на совместное ревью и после этого добавляем в `main`.

# Запуск прям как продакшен

Для запуска типа в продакшен потребуется:

1. Установить Docker Desktop ([скачать](https://www.docker.com/products/docker-desktop/))
2. Запустить Docker Desktop
3. В корне проекта прописать
   ```bash
   docker-compose up
   ```
