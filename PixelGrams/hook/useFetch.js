import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestMeditations, setBestMeditations] = useState([]);

  const pixelGramsData = [
    {
      id: 1,
      name: "Ramen Bowl",
      difficulty: "Intermediate",
      image: "https://magicoloriage.com/wp-content/uploads/2025/06/Pixel-art-recreez-un-bol-de-nouilles-kawaii-souriant-300x300.jpeg",
      description: "A delicious bowl of ramen with cute toppings.", 
    },
    {
      id: 2,
      name: "Sonic the Hedgehog",
      difficulty: "Intermediate",
      image: "https://images.squarespace-cdn.com/content/v1/534a969fe4b01ccabb38e0df/1568056567813-YNZ6T23MDEUQ23ISUQYR/Sonic.jpg?format=750w",
      description: "Classic video game character in pixel art style.",
    },
    {
      id: 3,
      name: "Watermelon Slice",
      difficulty: "Intermediate",
      image: "https://www.megavoxels.com/wp-content/uploads/2024/07/Pixel-Art-Watermelon-4.webp",
      description: "A refreshing slice of watermelon in pixel art.",
    },
    {
      id: 4,
      name: "Fox",
      difficulty: "Beginner",
      image: "https://i.pinimg.com/1200x/6a/f3/e6/6af3e62223e9fdb0eef596482a1cf5df.jpg",
      description: "A cute fox sitting in the forest.",
    },
    {
      id: 5,
      name: "Elfilin",
      difficulty: "Advanced",
      image: "https://preview.redd.it/elfilin-pixel-art-with-a-grid-to-make-your-own-physical-v0-izc781ic6igb1.jpg?width=1080&crop=smart&auto=webp&s=98d76f3724866929a592afe7e29ba4541605bda9",
      description: "A pixel art rendition of Elfilin from Kirby.",
    },
    {
      id: 6,
      name: "Duck with Flower",
      difficulty: "Intermediate",
      image: "https://i.pinimg.com/736x/fa/40/ec/fa40ec1fd1ea9dde46b21ed43ec99e6a.jpg",
      description: "A cute duck holding a flower in its beak.",
    },
    {
      id: 7,
      name: "Cow",
      difficulty: "Intermediate",
      image: "https://i.pinimg.com/736x/58/8e/62/588e6220f5abc24115bc2e1953dc6506.jpg",
      description: "A pixel art cow standing in a field.",
    },
    {
      id: 8,
      name: "Boba Tea Emoji",
      difficulty: "Beginner",
      image: "https://i.pinimg.com/736x/30/ed/0b/30ed0b98fcd3159006f91f3869f8d27b.jpg",
      description: "A cute boba tea emoji in pixel art style.",
    }
  ]

  const fetchData = () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        // Combine both arrays into one
        setData(pixelGramsData);
        setBestMeditations(pixelGramsData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError("Failed to fetch data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const getItemById = (id) => {
    const item =
      pixelGramsData.find((meditation) => meditation.id === id) ||
      pixelGramsData.find((meditation) => meditation.id === id);
    return item || null;
  };

  return { data, isLoading, error, refetch, getItemById, bestMeditations };
};

export default useFetch;
