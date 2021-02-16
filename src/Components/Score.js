import React, {useState} from "react";
import Predictions from '@aws-amplify/predictions';
import { API, Storage } from 'aws-amplify';

function Score() {
  const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    // setIsFilePicked(true);
    console.log("a");
    console.log(selectedFile);
	};

  function readUploadedFileAsText(inputFile){
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const singlePrediction = async (line) => {
    return Predictions.interpret({
      text: {
        source: {
          text: line,
        },
        type: "ALL",
      }
    })
    .then(result => {
      return (result["textInterpretation"]["sentiment"]["positive"]*100).toFixed(2);
    })
    .catch(err => console.log({ err }));
  }

  const runPrediction = async (lines) => {
    var positive_scores = []
    // console.log(lines);

    for (var i = 0; i < 8; i += 1){
      // console.log(lines[i])
      const score = await singlePrediction(lines[i]);
      // console.log(score)
      positive_scores.push(score);
    }
    return positive_scores
  }

  const uploadStorage = async (score) => {
    return Storage.put('test1.txt', score)
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));
  }

 	const handleSubmission = async () => {
     console.log("submitted!")
    // console.log(selectedFile);
    const fileContents = await readUploadedFileAsText(selectedFile);
    var lines = fileContents.split("\n");
    // console.log(lines[0]);
    var positive_scores = await runPrediction(lines);

    console.log(positive_scores);
    var sorted_scores = positive_scores.sort();
    uploadStorage(sorted_scores.toString())
    
  };
  
  return(
    <div style={{  
       backgroundImage: `url("background.svg")`,
     }} className="background"> 
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div className="container has-text-centered">
            <div className="moodiary">Score Tweet</div>
          
            <div className="my-6"></div>

            <input type="file" name="file" onChange={changeHandler} />
            <div className="my-6">
              <button onClick={handleSubmission}>Submit</button>
            </div>

          </div>

        </div>
        </section> 

    </div>
  )
}


export default Score;