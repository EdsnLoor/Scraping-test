import {filterAndOrder} from './helpers';

const news = [
  {
    "order": 1,
    "title": "Word1 Word2 Word3 Word4 Word5 Word6",
    "points": 44,
    "comments": 9
  },
  {
    "order": 2,
    "title": "Word1 Word2",
    "points": 376,
    "comments": 181
  },
  {
    "order": 3,
    "title": "Word1 Word2 Word3",
    "points": 285,
    "comments": 209
  },
  {
    "order": 4,
    "title": "Word1 Word2 Word3 Word4",
    "points": 47,
    "comments": 15
  },
  {
    "order": 5,
    "title": "Word1 Word2 Word3 Word4 Word5 Word6",
    "points": 98,
    "comments": 31
  }
]

test('Filter news rcytvybuni', () => {
  expect(filterAndOrder(news, 'title', 'comments', 1 )).toStrictEqual([
    {
      "order": 1,
      "title": "Word1 Word2 Word3 Word4 Word5 Word6",
      "points": 44,
      "comments": 9
    },
    {
      "order": 5,
      "title": "Word1 Word2 Word3 Word4 Word5 Word6",
      "points": 98,
      "comments": 31
    }
  ]);
});

test('Filter news rcytvybuniqewewfew', () => {
  expect(filterAndOrder(news, 'title', 'points', 0 )).toStrictEqual([
    {
      "order": 4,
      "title": "Word1 Word2 Word3 Word4",
      "points": 47,
      "comments": 15
    },
    {
      "order": 3,
      "title": "Word1 Word2 Word3",
      "points": 285,
      "comments": 209
    },
    {
      "order": 2,
      "title": "Word1 Word2",
      "points": 376,
      "comments": 181
    }
  ]);
});
