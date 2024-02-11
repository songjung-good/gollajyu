const tmpAxiosRes = {
  신발: [
    {
      tagId: 0,
      category: "all",
      tag: "all",
      count: 0,
    },
  ],
  의류: [
    {
      tagId: 0,
      category: "all",
      tag: "all",
      count: 0,
    },
  ],
  가구: [
    {
      tagId: 0,
      category: "all",
      tag: "all",
      count: 0,
    },
  ],
  전자제품: [
    {
      tagId: 0,
      category: "all",
      tag: "all",
      count: 2,
    },
    {
      tagId: 18,
      category: "전자제품",
      tag: "디자인",
      count: 2,
    },
  ],
};
/*
// Initialize total count variable
let totalCount = 0;

// Iterate through each category
for (const category in tmpAxiosRes) {
  // Check if the category has data
  if (category !== "간단" && tmpAxiosRes.hasOwnProperty(category)) {
    // Get the data for the category
    const categoryData = tmpAxiosRes[category];

    // Iterate through each item in the category data
    for (const item of categoryData) {
      // Iterate through each object in the item
      for (const obj of item) {
        // Check if tagId is 0
        if (obj.tagId === 0) {
          // Add count value to the total count
          totalCount += obj.count;
        }
      }
    }
  }
}

console.log("Total count for tagId 0:", totalCount);

const categoryRatio = {};

// Iterate through each category
for (const category in tmpAxiosRes) {
  // Check if the category has data
  if (category !== "간단" && tmpAxiosRes.hasOwnProperty(category)) {
    // Get the data for the category
    const categoryData = tmpAxiosRes[category];

    // Iterate through each item in the category data
    for (const item of categoryData) {
      // Iterate through each object in the item
      for (const obj of item) {
        // Check if tagId is 0
        if (obj.tagId === 0) {
          // Add count value to the total count
          categoryRatio[category] = (obj.count / totalCount) * 100;
        }
      }
    }
  }
}

console.log(categoryRatio);

const tagRatio = {};
// Iterate through each category
for (const category in tmpAxiosRes) {
  // Check if the category has data
  if (category !== "간단" && tmpAxiosRes.hasOwnProperty(category)) {
    // Get the data for the category
    const categoryData = tmpAxiosRes[category];
    tagRatio[category] = {};
    // Iterate through each item in the category data
    for (const item of categoryData) {
      const categoryTotal = item.find((item) => item.tagId === 0).count;
      // Iterate through each object in the item
      for (const obj of item) {
        // Check if tagId is 0
        if (obj.tagId !== 0) {
          // Add count value to the total count
          tagRatio[category][obj.tag] = (obj.count / categoryTotal) * 100;
        }
      }
    }
  }
}

console.log(tagRatio);

*/

// 함수를 통해 카테고리 별로 태그 비율을 계산하는 기능을 추출합니다.
const calculateCategoryRatio = (data, totalCount) => {
  const categoryRatio = {};
  for (const category in data) {
    if (data.hasOwnProperty(category)) {
      const categoryData = data[category];
      const categoryTotal = categoryData.find((item) => item.tagId === 0).count;
      categoryRatio[category] = (categoryTotal / totalCount) * 100;
    }
  }
  return categoryRatio;
};

// 카테고리 별, 태그 별로 비율을 계산
const calculateTagRatio = (data) => {
  const tagRatio = {};
  for (const category in data) {
    if (data.hasOwnProperty(category)) {
      const categoryData = data[category];
      const categoryTotal = categoryData.find((item) => item.tagId === 0).count;
      tagRatio[category] = {};
      for (const obj of categoryData) {
        if (obj.tagId !== 0) {
          tagRatio[category][obj.tag] = (obj.count / categoryTotal) * 100;
        }
      }
    }
  }
  return tagRatio;
};

// 간단을 제외하고, 참여한 모든 투표 수를 더함
let totalCount = 0;
for (const category in tmpAxiosRes) {
  if (tmpAxiosRes.hasOwnProperty(category)) {
    const categoryData = tmpAxiosRes[category];
    console.log(categoryData);
    const categoryTotal = categoryData.find((item) => item.tagId === 0).count;
    totalCount += categoryTotal;
  }
}

console.log("totalCount:", totalCount);

// 카테고리별 투표 비율을 계산합니다.
const categoryRatio = calculateCategoryRatio(tmpAxiosRes, totalCount);
console.log("Category Ratio:", categoryRatio);

// 카테고리별 태그별 투표 비율을 계산합니다.
const tagRatio = calculateTagRatio(tmpAxiosRes);
console.log("Tag Ratio:", tagRatio);

// const data = {
//   신발: {
//     가성비: 20,
//     디자인: 10,
//     소재: 70,
//   },
//   의류: {},
//   가구: {
//     소재: 100,
//   },
//   전자제품: {
//     디자인: 66.66666666666666,
//     가성비: 33.33333333333333,
//   },
// };

const data = {
  category: "의류",
  0: 30,
  1: 20,
  2: 20,
  3: 15,
  4: 15,
};

const findTop3Tags = (obj) => {
  const sortedTags = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  const top3Tags = sortedTags.slice(0, 3);

  return top3Tags.map(([key, value]) => ({ key, value }));
};
// // Function to sort the properties of an object based on their numeric values
// function sortObjectByValue(obj) {
//   const sortedObj = {};
//   Object.keys(obj)
//     .sort((a, b) => obj[b] - obj[a]) // Sort keys based on their values in descending order
//     .forEach((key) => {
//       sortedObj[key] = obj[key];
//     });
//   return sortedObj;
// }

// // Sort the values of the data object
// const sortedData = sortObjectByValue(data.shoes);

console.log(findTop3Tags(data));
