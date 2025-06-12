// const XLSX = require('xlsx');

// const workbook = XLSX.readFile('timetable.xlsx');
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];
// const data = XLSX.utils.sheet_to_json(worksheet);

// console.log(data); // Сабақ кестесін JSON форматында көруге болады


// const XLSX = require('xlsx');
// const readline = require('readline-sync');
// const { CohereClient } = require('cohere-ai');

// const cohere = new CohereClient({
//   token: "gqaCQJwyChuIXk2rBFHpBShLMeI8MW4eJ33LQY1v",
// });

// // Excel оқу
// const workbook = XLSX.readFile('timetable.xlsx');
// const sheetName = workbook.SheetNames[0];
// const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// function generateContext(question) {
//   const context = [];
//   const days = ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма'];
//   const questionLower = question.toLowerCase();
//   const targetDays = days.filter(day => questionLower.includes(day.toLowerCase()));

//   worksheet.forEach((row) => {
//     const top = row['Топ аты'];
//     if (!top) return;

//     targetDays.forEach((day) => {
//       const lessons = [];

//       Object.entries(row).forEach(([key, value]) => {
//         if (key.startsWith(day) && value && typeof value === 'string') {
//           const cleaned = value.replace(/\r?\n/g, ' | ').trim();
//           lessons.push(cleaned);
//         }
//       });

//       if (lessons.length > 0) {
//         context.push({
//           title: `Топ: ${top}, Күн: ${day}`,
//           snippet: `Топ ${top} үшін ${day} күнгі сабақтар: ${lessons.join('; ')}`
//         });
//       }
//     });
//   });

//   return context;
// }

// async function askLoop() {
//   while (true) {
//     const question = readline.question('\nСұрағыңызды жазыңыз ("шығу" деп жазсаңыз — тоқтайды):\n');
//     if (question.trim().toLowerCase() === 'шығу') {
//       console.log("Бағдарлама аяқталды.");
//       break;
//     }

//     const context = generateContext(question);

//     try {
//       const response = await cohere.chat({
//         model: 'command-a-03-2025',
//         message: question,
//         documents: context,
//         temperature: 0.4,
//       });

//       console.log('\nЖауап:\n' + response.text);
//     } catch (err) {
//       console.error('Қате орын алды:', err.message);
//     }
//   }
// }

// askLoop();


const XLSX = require('xlsx');
const readline = require('readline-sync');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: "gqaCQJwyChuIXk2rBFHpBShLMeI8MW4eJ33LQY1v", // 🔒 Кілтіңізді осында қойыңыз
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

    // әр күнге тиесілі колонкаларды бөлу
    let currentDay = null;
    Object.keys(row).forEach((col) => {
      if (days.includes(col)) currentDay = col;
      if (currentDay) {
        if (!dayCols[currentDay]) dayCols[currentDay] = [];
        dayCols[currentDay].push(col);
      }
    });

    // күн-күн бойынша сабақтарды жинау
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

// 🔁 Сұрақ-жауап циклі
async function askLoop() {
  const context = generateContext();

  while (true) {
    const question = readline.question('\nСұрағыңызды жазыңыз ("шығу" деп жазсаңыз — тоқтайды):\n');
    if (question.trim().toLowerCase() === 'шығу') {
      console.log("Бағдарлама аяқталды.");
      break;
    }

    try {
      const response = await cohere.chat({
        model: 'command-a-03-2025',
        message: question,
        documents: context,
        temperature: 0.3,
      });

      console.log('\nЖауап:\n' + response.text);
    } catch (err) {
      console.error('Қате:', err.message);
    }
  }
}

askLoop();

