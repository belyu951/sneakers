const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + ''))

// Эндпоинт для добавления данных в JSON файл
app.post("/save", (req, res) => {
  const newData = req.body;

  // Чтение текущих данных из файла
  fs.readFile("data.json", "utf-8", (err, fileData) => {
    if (err && err.code !== "ENOENT") { // ENOENT означает, что файл не найден
      console.error("Ошибка чтения файла:", err);
      return res.status(500).send("Ошибка сервера при чтении файла");
    }

    let jsonData = [];
    if (fileData) {
      try {
        jsonData = JSON.parse(fileData); // Парсим данные из файла
        if (!Array.isArray(jsonData)) {
          jsonData = []; // Если JSON не массив, сбрасываем его в пустой массив
        }
      } catch (parseErr) {
        console.error("Ошибка парсинга JSON:", parseErr);
        jsonData = []; // При ошибке парсинга используем пустой массив
      }
    }

    // Добавляем новые данные
    jsonData.push(newData);

    // Сохраняем обновленные данные в файл
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Ошибка записи файла:", writeErr);
        return res.status(500).send("Ошибка сервера при записи файла");
      }

      res.send("Данные успешно добавлены в data.json");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
