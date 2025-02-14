export const mockData = {
    home: {
        data: [
            {
                "createdAt": "2025-02-01T14:46:36.646888",
                "createdBy": "220401010029",
                "description": "Hiragana is a Japanese syllabary, one basic component of the Japanese writing system.",
                "name": "HIRAGANA",
                "order": 1,
                "original": "ひらがな"
            },
            {
                "createdAt": "2025-02-01T14:46:36.654423",
                "createdBy": "220401010029",
                "description": "Katakana is a Japanese syllabary, one basic component of the Japanese writing system.",
                "name": "KATAKANA",
                "order": 2,
                "original": "カタカナ"
            },
            {
                "createdAt": "2025-02-01T14:46:36.654423",
                "createdBy": "220401010029",
                "description": "Kanji N5 is the first level of the Japanese Language Proficiency Test (JLPT).",
                "name": "KANJI N5",
                "order": 3,
                "original": "漢字 N5"
            }
        ],
        error: null
    },
    material: (title: string) => {
        if (title === "HIRAGANA") {
            return {
                data: [
                    {
                        "createdAt": null,
                        "createdBy": null,
                        "materialParent": {
                            "name": "HIRAGANA"
                        },
                        "description": "main letters of hiragana",
                        "id": null,
                        "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-a.jpg",
                        "name": "Letters",
                        "position": 1
                    },
                    {
                        "materialParent": {
                            "name": "HIRAGANA"
                        },
                        "createdAt": null,
                        "createdBy": null,
                        "description": "voicing mark of hiragana",
                        "id": null,
                        "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-e.jpg",
                        "name": "Ten&Maru",
                        "position": 2
                    },
                    {
                        "materialParent": {
                            "name": "HIRAGANA"
                        },
                        "createdAt": null,
                        "createdBy": null,
                        "description": "semi-voicing mark of hiragana",
                        "id": null,
                        "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-u.jpg",
                        "name": "Yōon",
                        "position": 3
                    },
                    {
                        "materialParent": {
                            "name": "HIRAGANA"
                        },
                        "createdAt": null,
                        "createdBy": null,
                        "description": "Test your knowledge of hiragana",
                        "id": null,
                        "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-ku.jpg",
                        "name": "Quiz",
                        "position": 4
                    }
                ],
                error: null
            }
        }
        return {
            data: [
                {
                    "createdAt": null,
                    "createdBy": null,
                    "materialParent": {
                        "name": "KATAKANA"
                    },
                    "description": "main letters of katakana",
                    "id": null,
                    "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-to.jpg",
                    "name": "Letters",
                    "position": 1
                },
                {
                    "createdAt": null,
                    "materialParent": {
                        "name": "KATAKANA"
                    },
                    "createdBy": null,
                    "description": "voicing mark of katakana",
                    "id": null,
                    "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-ku.jpg",
                    "name": "Ten&Maru",
                    "position": 2
                },
                {
                    "createdAt": null,
                    "createdBy": null,
                    "materialParent": {
                        "name": "KATAKANA"
                    },
                    "description": "semi-voicing mark of katakana",
                    "id": null,
                    "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-ki.jpg",
                    "name": "Yōon",
                    "position": 3
                },
                {
                    "createdAt": null,
                    "materialParent": {
                        "name": "KATAKANA"
                    },
                    "createdBy": null,
                    "description": "Test your knowledge of katakana",
                    "id": null,
                    "imageUri": "https://jpn-bucket.s3.ap-southeast-2.amazonaws.com/materials/hira-i.jpg",
                    "name": "Quiz",
                    "position": 4
                }
            ],
            error: null
        }
    },
    userProfile: {
        campus: "Universitas Siber Asia",
        fullName: "JOHN DOE",
        gender: "L",
        joinDate: "2022-10-17T00:00:00Z",
        level: "Sarjana",
        major: "PJJ Informatika",
        profilePicture: {
            filename: "1739551889827_profile-picture.jpg",
            id: "a34b30ac-7425-4f26-8056-64d150fd8f3f",
            url: "example.com"
        },
        status: "Non-Aktif-2024/2025 Ganjil",
        studentId: "220401010000"
    }
}

