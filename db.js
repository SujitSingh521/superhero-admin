const data = {
  "heroes": [
    {
      "id": 1,
      "name": "IronMan",
      "powers": ["robot", "money"],
      "health": 33,
      "villains": [
        {
          "name": "Mandarin",
          "health": 50
        }
      ]
    }
  ]
};

// Accessing data
console.log(data.heroes[0].name); // Output: IronMan
console.log(data.heroes[0].villains[0].name); // Output: Mandarin
