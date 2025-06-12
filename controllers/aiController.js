// controllers/aiController.js
'use strict';

const XLSX = require('xlsx');
const { CohereClient } = require('cohere-ai');

// Cohere клиенті
const cohere = new CohereClient({
  token: "gqaCQJwyChuIXk2rBFHpBShLMeI8MW4eJ33LQY1v",
});

// Excel оқу
const workbook = XLSX.readFile('timetable.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// 1-жол – парлар, 2-жол – уақыттар
const parRow = worksheet[0];
const timeRow = worksheet[1];
const groupRows = worksheet.slice(2);

// Cohere-ге арналған контекст генерация
function generateContext() {
  const context = [];

  groupRows.forEach((row) => {
    const top = row['Топ аты'];
    const aud = row['АУДИТОРИЯ'];
    if (!top || !aud) return;

    const days = ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма'];
    const dayCols = {};

    let currentDay = null;
    Object.keys(row).forEach((col) => {
      if (days.includes(col)) currentDay = col;
      if (currentDay) {
        if (!dayCols[currentDay]) dayCols[currentDay] = [];
        dayCols[currentDay].push(col);
      }
    });

    for (const day of Object.keys(dayCols)) {
      const lines = [];

      dayCols[day].forEach((col) => {
        const teacherAndSubject = row[col];
        const time = timeRow[col];
        const para = parRow[col];

        if (teacherAndSubject && time && para) {
          const lesson = teacherAndSubject.replace(/\r?\n/g, ' | ').trim();
          lines.push(`${para} (${time}): ${lesson} (${aud})`);
        }
      });

      if (lines.length > 0) {
        context.push({
          title: `Топ: ${top}, Күн: ${day}`,
          snippet: `Топ ${top} үшін ${day} күнгі сабақтар:\n` + lines.join('\n')
        });
      }
    }
  });

  return context;
}

// POST /ask сұрағына жауап беретін контроллер
exports.askAI = async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Сұрақ берілмеген.' });
  }

  try {
    const context = generateContext();

    const response = await cohere.chat({
      model: 'command-a-03-2025',
      message: question,
      documents: context,
      temperature: 0.3,
    });

    return res.json({ answer: response.text });
  } catch (err) {
    console.error('Қате:', err.message);
    return res.status(500).json({ error: 'Жүйелік қате болды.' });
  }
};
