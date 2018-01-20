/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function () {
    return [
        {
            id: 1,
            first: "Bucky",
            last: "Roberts",
            age: 71
        },
        {
            id: 2,
            first: "Joby",
            last: "Wasilenko",
            age: 27
        },
        {
            id: 3,
            first: "Madison",
            last: "Williams",
            age: 24
        }
    ]
}
