const prompts = {
	"History": "Questions about history with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who was the first emperor of Rome?\n- Augustus\n- Julius Caesar\n- Nero\n- Caligula\nCorrect: Augustus\n--\nQuestion: Who discovered America?\n- Christopher Columbus\n- Leif Erikson\n- Amerigo Vespucci\n- Vasco da Gama\nCorrect: Christopher Columbus\n--\nQuestion: In what year did World War I start?\n- 1914\n- 1939\n- 1945\n- 1918\nCorrect: 1914\n--\nQuestion: Who was the first president of the United States of America?\n- George Washington\n- John Adams\n- Thomas Jefferson\n- Abraham Lincoln\nCorrect: George Washington\n--\nQuestion: Who painted the Mona Lisa?\n- Leonardo da Vinci\n- Michelangelo\n- Raphael\n- Caravaggio\nCorrect: Leonardo da Vinci\n--\nQuestion: In what year did the Berlin Wall fall?\n- 1989\n- 1991\n- 1987\n- 1985\nCorrect: 1989\n--\nQuestion: Who wrote \"To be, or not to be\"?\n- William Shakespeare\n- Oscar Wilde\n- Charles Dickens\n- Jane Austen\nCorrect: William Shakespeare\n--\nQuestion: Who was the Queen of England during World War II?\n- Queen Elizabeth I\n- Queen Elizabeth II\n- Queen Victoria\n- Queen Mary\nCorrect: Elizabeth I\n--\nQuestion: In what year did the American Civil War end?\n- 1865\n- 1861\n- 1870\n- 1875\nCorrect: 1865\n--\nQuestion: Who invented the telephone?\n- Alexander Graham Bell\n- Thomas Edison\n- Nikola Tesla\n- Marconi\nCorrect: Alexander Graham Bell\n--\nQuestion: Who was the Ancient Greek God of the Sun?\n- Apollo\n- Zeus\n- Poseidon\n- Hades\nCorrect: Apollo\n--\nQuestion: What is the name of the French city where the treaty of Versailles was signed?\n- Paris\n- Versailles\n- Rome\n- London\nCorrect: Paris\n--",

	"Entertainment": 'Questions about Entertainment with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who directed the movie \"The Shawshank Redemption\"?\n- Frank Darabont\n- Steven Spielberg\n- Martin Scorsese\n- Christopher Nolan\nCorrect: Frank Darabont\n--\nQuestion: Who played the character of Iron Man in the Marvel Cinematic Universe?\n- Robert Downey Jr.\n- Chris Evans\n- Chris Hemsworth\n- Mark Ruffalo\nCorrect: Robert Downey Jr.\n--\nQuestion: What is the name of the main character in the Harry Potter series?\n- Harry Potter\n- Hermione Granger\n- Ron Weasley\n- Neville Longbottom\nCorrect: Harry Potter\n--\nQuestion: Who won the Academy Award for Best Actor in 2019?\n- Rami Malek\n- Christian Bale\n- Joaquin Phoenix\n- Brad Pitt\nCorrect: Rami Malek\n--\nQuestion: What is the name of the band that performed the song \"Bohemian Rhapsody\"?\n- Queen\n- The Beatles\n- Led Zeppelin\n- Pink Floyd\nCorrect: Queen\n--\nQuestion: Who is the author of the book series \"The Hunger Games\"?\n- Suzanne Collins\n- Stephenie Meyer\n- J.K. Rowling\n- George R.R. Martin\n--\nQuestion: Who played the character of Forrest Gump in the 1994 film of the same name?\n- Tom Hanks\n- Tom Cruise\n- Jim Carrey\n- Robin Williams\nCorrect: Tom Hanks\n--\nQuestion: What is the name of the animated movie about living toys?\n- Toy Story\n- The Incredibles\n- Ratatouille\n- Up\nCorrect: Toy Story\n--\nQuestion: Who played the role of The Joker in the 2019 film \"Joker\"?\n- Joaquin Phoenix\n- Heath Ledger\n- Jared Leto\n- Jack Nicholson\nCorrect: Joaquin Phoenix\n--\nQuestion: Who won the Grammy Award for Album of the Year in 2021?\n- Taylor Swift\n- Dua Lipa\n- Billie Eilish\n- Ariana Grande\nCorrect: Taylor Swift\n--\nQuestion: Kratos is the main character of what video game series?\n- God of War\n- The Last of Us\n- Uncharted\n- The Legend of Zelda\nCorrect: God of War\n--\nQuestion: What is the name of the villian in the movie \"The Lion King\"?\n- Scar\n- Mufasa\n- Timon\n- Pumbaa\nCorrect: Scar\n--\nQuestion: What is the best-selling video game in history?\n- Minecraft\n- Grand Theft Auto V\n- Tetris\n- Super Mario Bros.\nCorrect: Minecraft\n--\nQuestion: In which game is the character \"Arthur Morgan\" the protagonist?\n- Red Dead Redemption 2\n- Grand Theft Auto V\n- The Last of Us\n- Uncharted 4\nCorrect: Red Dead Redemption 2\n--',

	"Technology": 'Questions about Technology with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who created the Windows operating system?\n- Microsoft\n- Apple\n- Google\n- IBM\nCorrect: Microsoft\n--\nQuestion: Who invented the World Wide Web (WWW)?\n- Tim Berners-Lee\n- Bill Gates\n- Steve Jobs\n- Mark Zuckerberg\nCorrect: Tim Berners-Lee\n--\nQuestion: What is the name of the most popular search engine?\n- Google\n- Bing\n- Yahoo\n- Baidu\nCorrect: Google\n--\nQuestion: Who is the CEO of Tesla, Inc.?\n- Elon Musk\n- Jeff Bezos\n- Satya Nadella\n- Tim Cook\nCorrect: Elon Musk\n--\nQuestion: Who is the creator of the programming language Python?\n- Guido van Rossum\n- James Gosling\n- Bjarne Stroustrup\n- Brendan Eich\nCorrect: Guido van Rossum\n--\nQuestion: What is the name of the virtual assistant created by Apple Inc.?\n- Siri\n- Alexa\n- Google Assistant\n- Bixby\nCorrect: Siri\n--\nQuestion: Who invented the email system?\n- Ray Tomlinson\n- Tim Berners-Lee\n- Marc Andreessen\n- Vint Cerf\nCorrect: Ray Tomlinson\n--\nQuestion: What is the name of the social media created by Mark Zuckerberg?\n- Facebook\n- Twitter\n- Instagram\n- Snapchat\nCorrect: Facebook\n--\nQuestion: Who invented the microprocessor?\n- Intel\n- AMD\n- ARM\n- Qualcomm\nCorrect: Intel\n--\nQuestion: What color is the \"G\" in the Google logo?\n- Blue\n- Red\n- Green\n- Yellow\nCorrect: Blue\n--',

	"Geography": 'Questions about Geography with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: What is the capital of the United States of America?\n- Washington D.C.\n- New York City\n- Los Angeles\n- Chicago\nCorrect: Washington D.C.\n--\nQuestion: What is the longest river in the world?\n- Nile\n- Amazon\n- Yangtze\n- Mississippi\nCorrect: Nile\n--\nQuestion: Which country is home to the Great Barrier Reef?\n- Australia\n- Brazil\n- South Africa\n- Madagascar\nCorrect: Australia\n--\nQuestion: What is the capital of China?\n- Beijing\n- Shanghai\n- Hong Kong\n- Taipei\nCorrect: Beijing\n--\nQuestion: Which country is located between France and Germany?\n- Belgium\n- Netherlands\n- Denmark\n- Switzerland\nCorrect: Belgium\n--\nQuestion: What is the capital of India?\n- New Delhi\n- Mumbai\n- Bangalore\n- Hyderabad\nCorrect: New Delhi\n--\nQuestion: What is the tallest mountain in the world?\n- Mount Everest\n- K2\n- Mount Kilimanjaro\n- Mount Denali\nCorrect: Mount Everest\n--\nQuestion: What is the largest ocean in the world?\n- Pacific Ocean\n- Atlantic Ocean\n- Indian Ocean\n- Arctic Ocean\nCorrect: Pacific Ocean\n--\nQuestion: Which country is home to the Serengeti National Park?\n- Kenya\n- Tanzania\n- South Africa\n- Namibia\nCorrect: Kenya\n--\nQuestion: What is the capital of Brazil?\n- Brasilia\n- Rio de Janeiro\n- São Paulo\n- Salvador\nCorrect: Brasilia\n--',

	"Art": 'Questions about Art with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who painted the famous artwork \"The Starry Night\"?\n- Vincent van Gogh\n- Pablo Picasso\n- Leonardo da Vinci\n- Gustav Klimt\nCorrect: Vincent van Gogh\n--\nQuestion: Who sculpted the statue of David?\n- Michelangelo\n- Bernini\n- Donatello\n- Rodin\nCorrect: Michelangelo\n--\nQuestion: Who painted the famous artwork \"The Persistence of Memory\"?\n- Salvador Dalí\n- Pablo Picasso\n- Vincent van Gogh\n- Claude Monet\nCorrect: Salvador Dalí\n--\nQuestion: Who sculpted the statue \"The Thinker\"?\n- Auguste Rodin\n- Michelangelo\n- Bernini\n- Donatello\nCorrect: Auguste Rodin\n--\nQuestion: Who wrote the play \"Romeo and Juliet\"?\n- William Shakespeare\n- Oscar Wilde\n- Anton Chekhov\n- Tennessee Williams\nCorrect: William Shakespeare\n--\nQuestion: Who wrote the novel \"Pride and Prejudice\"?\n- Jane Austen\n- Charlotte Bronte\n- Louisa May Alcott\n- Emily Dickinson\nCorrect: Jane Austen\n--\nQuestion: Who composed the opera \"La Boheme\"?\n- Giuseppe Verdi\n- Wolfgang Amadeus Mozart\n- Ludwig van Beethoven\n- Franz Schubert\nCorrect: Giuseppe Verdi\n--\nQuestion: Who composed the \"Symphony No. 9\"?\n- Ludwig van Beethoven\n- Wolfgang Amadeus Mozart\n- Franz Joseph Haydn\n- Gustav Mahler\nCorrect: Ludwig van Beethoven\n--\nQuestion: Who composed the \"Moonlight Sonata\"?\n- Ludwig van Beethoven\n- Frédéric Chopin\n- Wolfgang Amadeus Mozart\n- Johannes Brahms\nCorrect: Ludwig van Beethoven\n--\nQuestion: Who wrote the novel \"One Hundred Years of Solitude\"?\n- Gabriel García Márquez\n- Ernest Hemingway\n- F. Scott Fitzgerald\n- William Faulkner\nCorrect: Gabriel García Márquez\n--',

	"Space": 'Questions about the Space with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: What is the name of the first artificial satellite launched into space?\n- Sputnik 1\n- Explorer 1\n- Vanguard 1\n- Vostok 1\nCorrect: Sputnik 1\n--\nQuestion: Who was the first person to walk on the moon?\n- Neil Armstrong\n- Buzz Aldrin\n- Michael Collins\n- Pete Conrad\nCorrect: Neil Armstrong\n--\nQuestion: What is the name of the largest planet in our solar system?\n- Jupiter\n- Saturn\n- Neptune\n- Uranus\nCorrect: Jupiter\n--\nQuestion: Who was the first astronaut to orbit the Earth?\n- Yuri Gagarin\n- Neil Armstrong\n- John Glenn\n- Alan Shepard\nCorrect: Yuri Gagarin\n--\nQuestion: What is the name of the largest moon in our solar system?\n- Ganymede\n- Callisto\n- Titan\n- Triton\nCorrect: Ganymede\n--\nQuestion: Who was the commander of the Apollo 11 mission to the moon?\n- Neil Armstrong\n- Buzz Aldrin\n- Michael Collins\n- Pete Conrad\nCorrect: Neil Armstrong\n--\nQuestion: What is the name of the constellation commonly referred to as the \"Little Dipper\"?\n- Ursa Minor\n- Cassiopeia\n- Cygnus\n- Orion\nCorrect: Ursa Minor\n--\nQuestion: What is the name of the celestial body located at the center of our solar system?\n- The Sun\n- Earth\n- Venus\n- Mars\nCorrect: The Sun\n--\nQuestion: Who many planets are there in our solar system?\n- 8\n- 9\n- 10\n- 11\nCorrect: 8\n--\nQuestion: Who many stars are in our solar system?\n- 1\n- 24\n- 100 billion aprox\n- Too many to count\nCorrect: 1\n--\nQuestion: What is the closest galaxy to ours?\n- Andromeda\n- Milky Way\n- Triangulum\n- Canis Major\nCorrect: Andromeda\n--',

	"Science": 'Questions about Science with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who is known as the \"Father of Modern Physics\"?\n- Albert Einstein\n- Isaac Newton\n- Stephen Hawking\n- Galileo Galilei\nCorrect: Albert Einstein\n--\nQuestion: Haematology is the study of what?\n- Blood\n- Bones\n- Muscles\n- Nerves\nCorrect: Blood\n--\nQuestion: What is the chemical symbol for the gold?\n- Au\n- Ir\n- Au\n- Ag\nCorrect: Au\n--\nQuestion: Who discovered the law of gravitation?\n- Isaac Newton\n- Galileo Galilei\n- Albert Einstein\n- Johannes Kepler\nCorrect: Isaac Newton\n--\nQuestion: Who discovered the circulation of blood?\n- William Harvey\n- Alessandro Volta\n- Michael Faraday\n- Charles Darwin\nCorrect: William Harvey\n--\nQuestion: Who formulated the theory of evolution by natural selection?\n- Charles Darwin\n- Gregor Mendel\n- Jean-Baptiste Lamarck\n- Thomas Malthus\nCorrect: Charles Darwin\n--\nQuestion: Who discovered the smallpox vaccine?\n- Louis Pasteur\n- Edward Jenner\n- Robert Koch\n- Alexander Fleming\nCorrect: Louis Pasteur\n--\nQuestion: What is the chemical symbol for the element oxygen?\n- O\n- N\n- H\n- C\nCorrect: O\n--\nQuestion: Which animal is faster?\n- Cheetah\n- Horse\n- Lion\n- Elephant\nCorrect: Cheetah\n--\nQuestion: What is the largest animal on earth?\n- Blue Whale\n- Elephant\n- Giraffe\n- Hippopotamus\nCorrect: Blue Whale\n--',

	"General culture": 'Questions about General Knowledge with 4 answers: 1 correct and 3 incorrect.\n--\nQuestion: Who is the current President of the United States?\n- Joe Biden\n- Donald Trump\n- Barack Obama\n- George W. Bush\nCorrect: Joe Biden\n--\nQuestion: How many minutes are in a full week?\n- 10,080\n- 7,200\n- 5,040\n- 3,600\nCorrect: 10,080\n--\nQuestion: How many elements are in the periodic table?\n- 118\n- 92\n- 104\n- 121\nCorrect: 118\n--\nQuestion: How many strings does a guitar have?\n- 6\n- 4\n- 5\n- 8\nCorrect: 6\n--\nQuestion: What country has won the most World Cups?\n- Brazil\n- Germany\n- Italy\n- Argentina\nCorrect: Brazil\n--\nQuestion: How many bones do we have in an ear?\n- 3\n- 5\n- 6\n- 23\nCorrect: 3\n--\nQuestion: What is the speed of light approximately?\n- 300,000 km/s\n- 180,000 km/s\n- 250,000 km/s\n- 150,000 km/s\nCorrect: 300,000 km/s\n--\nQuestion: What does CIA stand for?\n- Central Intelligence Agency\n- Central Intelligence Administration\n- Central Imperial Agency\n- Control Information Agency\nCorrect: Central Intelligence Agency\n--\nQuestion: Pyrophobia is the fear of what?\n- Fire\n- Water\n- Darkness\n- Heights\nCorrect: Fire\n--',
}

export default prompts;