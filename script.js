let TIME_LIMIT = 60 
  
const quotesList = [
  'Jika saatnya tiba, sedih akan menjadi tawa, perih akan menjadi cerita, kenangan akan menjadi guru, rindu akan menjadi temu, kau dan aku akan menjadi kita. - Fiersa Besari',
  'Cinta selalu saja misterius. Jangan diburu-buru, atau kau akan merusak jalan ceritanya sendiri. - Tere Liye',
  'Rindu tidak menuntut banyak hal. Ia hanya mengharapkan kabar dan pertemuan. - Alam Arifin',
  'Yang patah tumbuh, yang hilang berganti. - Haikal Art',
  'Beberapa rindu memang harus sembunyi-sembunyi. Bukan untuk disampaikan, hanya untuk dikirimkan lewat doa. - Fiersa Besari',
  'Hujan dan kamu adalah rindu. Kita akan menikmatinya dalam senja-senja beranjak pulang. Dalam rasa sayang yang tak akan pernah hilang. Bahkan saat hujan telah berhenti. - Boy Candra',
  'Saat lantunan rindu adalah alasan setiap pertemuan. - Wira Nagara',
  'Sungguh rindu membuat kebodohan terasa begitu cerdas. - Wira Nagara',
  'Kesalahanku, menjadikanmu alasan segala rindu. - Wira Nagara',
  'Jika panas, keringkan lukamu. Jika hujan, nikmati rindu. Jika gelap, biarkan harapan menuntumu. Mentari akan selalu terbit, juga senyumanmu. - Fiersa Besari',
  'Mungkin seseorang masih tak tahu lirih perih dalam rintik rindu ini. Selamat malam, kamu yang berlalu dalam gerimis. - Helvy Tiana Rosa',
  'Jika nanti, semesta bercanda dan mempertemukan kita lagi. Segeralah menghindar, sebab bagiku kamu tidak lagi sesuatu yang menarik meski rindu tak sepenuhnya memudar. - Boy Candra',
  'Kalau sampai rindu, aku tidak akan bilang-bilang, aku akan datang. Tidak ada yang berat, selama hati kita masih erat. - Fiersa Besari',
  'Jika kau percaya hujan adalah satu persen air, sembilan puluh sembilan persen kenangan, ya silakan. Kalau aku percaya hujan seratus persen adalah rindu, itu urusanku. - Boy Candra',
  'Lucu, kita membentuk pola pikir anak kecil agar tumbuh menjadi seperti kita. Padahal, diam-diam kita rindu menjadi anak kecil lagi. - Fiersa Besari'
]

let randomQuotes = quotesList[Math.floor(Math.random()*quotesList.length)]
let randomQuotes1 = quotesList[Math.floor(Math.random()*quotesList.length * 1)]
let randomQuotes2 = quotesList[Math.floor(Math.random()*quotesList.length * 2)]


const quotes_array = [
  `${randomQuotes}`, `${randomQuotes1}`, `${randomQuotes2}`
]


let timer_text = document.querySelector('.curr_time') 
let accuracy_text = document.querySelector('.curr_accuracy') 
let error_text = document.querySelector('.curr_errors') 
let cpm_text = document.querySelector('.curr_cpm') 
let wpm_text = document.querySelector('.curr_wpm') 
let quote_text = document.querySelector('.quote') 
let input_area = document.querySelector('.input_area') 
let restart_btn = document.querySelector('.restart_btn') 
let cpm_group = document.querySelector('.cpm') 
let wpm_group = document.querySelector('.wpm') 
let error_group = document.querySelector('.errors') 
let accuracy_group = document.querySelector('.accuracy') 
  
let timeLeft = TIME_LIMIT 
let timeElapsed = 0 
let total_errors = 0 
let errors = 0 
let accuracy = 0 
let characterTyped = 0 
let current_quote = '' 
let quoteNo = 0 
let timer = null

function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length)
  // Output random word
  currentWord.innerHTML = words[randIndex]
}

function updateQuote() { 
  quote_text.textContent = null 
  current_quote = quotes_array[quoteNo] 

    current_quote.split('').forEach(char => { 
    const charSpan = document.createElement('span') 
    charSpan.innerText = char 
    quote_text.appendChild(charSpan) 
  }) 
 
  
  if (quoteNo < quotes_array.length - 1) {
    quoteNo++
  } else {
    quoteNo = 0
  }
}

function processCurrentText() { 
  
  curr_input = input_area.value 
  curr_input_array = curr_input.split('') 
  
   
  characterTyped++ 
  
  errors = 0 
  
  quoteSpanArray = quote_text.querySelectorAll('span') 
  quoteSpanArray.forEach((char, index) => { 
    let typedChar = curr_input_array[index] 
  
      if (typedChar == null) { 
      char.classList.remove('correct_char') 
      char.classList.remove('incorrect_char') 
     
    } else if (typedChar === char.innerText) { 
      char.classList.add('correct_char') 
      char.classList.remove('incorrect_char') 
  
    } else { 
      char.classList.add('incorrect_char') 
      char.classList.remove('correct_char') 
  
        errors++ 
    } 
  }) 
  
   
  error_text.textContent = total_errors + errors 
  
   
  let correctCharacters = (characterTyped - (total_errors + errors)) 
  let accuracyVal = ((correctCharacters / characterTyped) * 100) 
  accuracy_text.textContent = Math.round(accuracyVal) 
  
  
  if (curr_input.length == current_quote.length) { 
    updateQuote() 
  
    total_errors += errors 
   
    input_area.value = '' 
  } 
}


function startGame() {

  resetValues()
  updateQuote()

  timer = setInterval(updateTimer, 1000)
}

function resetValues() {
  timeLeft = TIME_LIMIT
  timeElapsed = 0
  errors = 0
  total_errors = 0
  accuracy = 0
  characterTyped = 0
  quoteNo = 0
  input_area.disabled = false

  input_area.value = ''
  quote_text.textContent = 'Click on the area below to start the game.'
  accuracy_text.textContent = 100
  timer_text.textContent = timeLeft + 's'
  error_text.textContent = 0
  restart_btn.style.display = 'none' 
  cpm_group.style.display = 'none' 
  wpm_group.style.display = 'none'
}

function updateTimer() {
  if (timeLeft > 0) {

    timeLeft--

    timeElapsed++

    timer_text.textContent = timeLeft + 's'
  }
  else {

    finishGame()
  }
}

function finishGame() {

  clearInterval(timer)

  input_area.disabled = true

  quote_text.textContent = 'Click on restart to start a new game.'

  restart_btn.style.display = 'block'

  cpm = Math.round(((characterTyped / timeElapsed) * 60))
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60))

  cpm_text.textContent = cpm
  wpm_text.textContent = wpm
  cpm_group.style.display = 'block' 
  wpm_group.style.display = 'block'
}
