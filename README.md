<img width="425" alt="readme-icon(1)" src="https://user-images.githubusercontent.com/56173614/115152627-d1500c00-a03f-11eb-9895-20785076b3e7.png">

# Chrome Extension 

It's no secret that the internet is far from a safe space. There's harmful language - whether it be used "jokingly" or maliciously - that can be triggering for individuals of all identities. And, unfortunately, many websites and social media platforms do not give users the ability to censor content for themselves. This is where strikethru comes in.

**strikethru** is a Chrome extension that uses HTML scraping to find harmful words on a website and hides them from the user. Think of it like a content warning maker for the internet! The user can pick from different categories of potential trigger words and even add their own.

Our website also has a file upload tool that can filter an uploaded .txt file and output the same document with trigger words edited with asterisks. They can also choose to hide entire sentences that qualify sentiments in text, hiding entire sentences that are recognized as hate speech.
  
## For HackDartmouth
### How we built it
This Chrome extension allows users to sign into their account, and gets the saved filters from their account. The user can choose the filters they would like to apply to webpages they view while browsing the internet from the extension pop-up. Users can also enter inidividual words into the add word input, and the word will be added to the user's 'words-chosen-to-filter' set.

When the user opens a webpage, the extension parses the html to see if there are any instances of hate speech/slurs. If there are, the page is blurred out and the user receives a confirm alert asking if they would like to proceed to view the page. If the user chooses to proceed and view the page, the blurred background goes away, but the slurs/hate speech instances are blurred. If the user would like to view the blurred content, they can click the button in the extension to reveal the hidden text. 

### Challenges
We really wanted to be able to implement our own model for hate-speech classification, however we found that in the time given we could not reach a level of accuracy that surpassed too far off random. We used data from [kaggle](https://www.kaggle.com/usharengaraju/dynamically-generated-hate-speech-dataset) and trained two different Naive Bayes models, one with GaussianNB from Python's sklearn and one with the Naive Bayes Classifier from Python's textblob. In both cases we found issues with quality of data and predictive power, and thus we chose to use Python's hatesonar library. While there are also short comings in this model, we found that this was the best alternative to use for this project, as it was built in so little time.

### Next Steps
Strikethru's first next step would be to create a customized model for predicting our own criteria of 'hate speech'. Two of our members are actually in the first few weeks of COSC 72: Advanced Computational Lingustics, and we hope by the end of the term to be able to build out our own model with our own set of data and curated insights. We would aldo plan to work on increasing the level of customization and analytics for users, perhaps allowing more interactivity with data generated from their text analysis.
