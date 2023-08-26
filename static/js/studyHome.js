const level = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };

function goToLectureDetailPage(lecture_id) {
  location.href = location.href + lecture_id;
}


function searchLecture() {
  let searchText = document.getElementById("search").value;

  fetch(SERVER_ADDRESS + "/api/lectures/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: new URLSearchParams({ name: searchText }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
}


// 진행 중인 학습
fetch(SERVER_ADDRESS + "/api/lecturemanagers/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Extract an array of lecture IDs in the order they were studied
    const lectureOrder = data.map(item => item.lecture);

    // Fetch details of the lectures
    Promise.all(lectureOrder.map(lectureId => {
      return fetch(SERVER_ADDRESS + "/api/lecture/" + lectureId + "/")
        .then(response => response.json());
    }))
      .then(lectures => {
        const studyingBoxes = document.querySelectorAll(".lectures")[0];
        studyingBoxes.innerHTML = ""; // Clear the container
        // Render the lectures in the order they were studied
        lectures.forEach(lecture => {
          let text = `
            <div class="lecture" onclick="goToLectureDetailPage(${lecture.id})">
            <div class="difficulty">${level[lecture.level]}</div>
            <img class="lectureImg" src="${lecture.lecture_img}"/>
            <div class="lectureName">${lecture.name}</div>
            <div class="lengthWithPercent">
            <div class="maxLength">총 ${lecture.length}개</div>
            <div class="percent">${lecture.percentage}%</div>
            </div>
            <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${lecture.percentage}%, #d9d9d9 ${lecture.percentage}%, #d9d9d9 100%);"></div>
            </div>
            `;
          studyingBoxes.innerHTML += text;
        });
      });
  });

// 주간 인기 모음
fetch(SERVER_ADDRESS + "/api/lectures/popular/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Extract an array of lecture IDs in the order they were studied
    // Fetch details of the lectures
    Promise.all(data.map(lecture => {
      return fetch(SERVER_ADDRESS + "/api/lecture/" + lecture.id + "/")
        .then(response => response.json());
    }))
      .then(lectures => {
        console.log(lectures)
        const studyingBoxes = document.querySelectorAll(".lectures")[1];
        console.log(studyingBoxes)

        studyingBoxes.innerHTML = ""; // Clear the container
        // Render the lectures in the order they were studied
        lectures.forEach(lecture => {
          let text = `
           <div class="lecture" onclick="goToLectureDetailPage(${lecture.id})">
           <div class="difficulty">${level[lecture.level]}</div>
           <img class="lectureImg" src="${lecture.lecture_img}"/>
           <div class="lectureName">${lecture.name}</div>
           <div class="lengthWithPercent">
           <div class="maxLength">총 ${lecture.length}개</div>
           <div class="percent">${lecture.percentage}%</div>
           </div>
           <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${lecture.percentage}%, #d9d9d9 ${lecture.percentage}%, #d9d9d9 100%);"></div>
           </div>
           `;
          studyingBoxes.innerHTML += text;
        });
      });
  });

// 3가지
fetch(SERVER_ADDRESS + "/api/lectures/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    lectures = document.querySelectorAll(".lectures");

    lecture1 = lectures[2];
    lecture2 = lectures[3];
    lecture3 = lectures[4];

    for (let i = 0; i < 10; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
      <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${now_data.percentage}%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
              `;
      lecture1.innerHTML += text;
    }

    for (let i = 10; i < 20; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id
        })">
      <div class="difficulty">${level[now_data.level]}</div>
      <img class="lectureImg" src="${now_data.lecture_img}"/>
      <div class="lectureName">${now_data.name}</div>
      <div class="lengthWithPercent">
      <div class="maxLength">총 ${now_data.length}개</div>
      <div class="percent">${now_data.percentage}%</div>
      </div>
      <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${now_data.percentage}%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
      `;
      lecture2.innerHTML += text;
    }

    for (let i = 20; i < 30; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id
        })">
      <div class="difficulty">${level[now_data.level]}</div>
      <img class="lectureImg" src="${now_data.lecture_img}"/>
      <div class="lectureName">${now_data.name}</div>
      <div class="lengthWithPercent">
      <div class="maxLength">총 ${now_data.length}개</div>
      <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${now_data.percentage}%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
                `;
      lecture3.innerHTML += text;
    }
  });

// 버튼 조작
document.addEventListener("DOMContentLoaded", function () {
  const leftButton = document.querySelectorAll(".left");
  const rightButton = document.querySelectorAll(".right");
  const lecturesContainers = document.querySelectorAll(".lectures");

  let currentPositions = new Array(lecturesContainers.length);
  for (let i = 0; i < currentPositions.length; ++i) {
    currentPositions[i] = 0;
  }

  const lectureWidth = 187; // 각 박스의 너비

  for (let index = 0; index < lecturesContainers.length; index++) {
    leftButton[index].addEventListener("click", function () {
      if (currentPositions[index] < 0) {
        currentPositions[index] += lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
      }
    });

    rightButton[index].addEventListener("click", function () {
      const maxPosition = -(
        lectureWidth *
        (lecturesContainers[index].children.length - 4)
      ); // 4개의 박스가 화면에 보일 때까지만 이동
      if (currentPositions[index] > maxPosition) {
        currentPositions[index] -= lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
      }
    });
  }
});

// document.getElementById("SearchBtn")
//   .addEventListener("click", searchLecture);

// document.getElementById("search")
//   .addEventListener("keyup", function (event) {
  //     event.preventDefault();
//     console.log(document.getElementById("lectureSection"))
//     let lectures = document.getElementsByClassName("lecture")
//     if (document.getElementById("search").value.length == 0) {
  //       for (let i = 0; i < lectures.length; i++) {
    //         lectures[i].hidden = false
//       }
//     } else {
//       for (let i = 0; i < lectures.length; i++) {
//         lectures[i].hidden = true
//       }
//       document.getElementById("SearchBtn").click();
//     }

//   });