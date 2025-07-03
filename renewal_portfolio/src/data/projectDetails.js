import {projectImages} from "@/constants/projectData.js";
export const projectDetails = {
    1:{
        title: "쿡쉐어 리뉴얼 프로젝트[진행중]",
        description: "혼자 먹기엔 많은 음식’을 함께 나누고, 1인 가구의 식생활 부담을 줄이는 커뮤니티 기반 공유 냉장고 플랫폼 구축",
        stack: ["react_c", "scss_c", "vite_c","figma_c"],
        member : "2명(Frontend, Backend)",
        period: "2025.05 ~ 현재",
        link : [
            "https://github.com/FB-CodeQuest/cook-share-renewal",
            "https://www.figma.com/design/UIqHyWmUSSDEX9zThkLH3X/Cook-share?node-id=0-1&t=tps7dp2jB25E8rju-1"
        ],
        keyImage: projectImages.wip,
        alt: "쿡쉐어 리뉴얼 프로젝트 이미지",
        features: [
            "회원가입 5단계 스텝 UI 및 인증 흐름 설계",
            "위치 기반 공유 냉장고 등록 및 검색 기능",
            "냉장고별 나눔 게시글 CRUD 구현",
            "레시피 공유 및 해시태그 검색 기능",
            "식자재 공동 구매 및 커머스 기능",
            "Kakao Map API 연동"
        ],
        contributions: [
            {
                title: "UI/UX 설계 및 프론트엔드 전체 개발",
                content:[
                    "Figma를 사용하여 컴포넌트 단위로 UI 설계",
                    "React 기반으로 프로젝트 구조를 설계",
                    "상태 기반 스텝 컴포넌트를 구성하여 회원가입 흐름을 구현",
                    "SCSS 전역 변수 및 mixin으로 UI 일관성을 확보"
                ]

            },
            {
                title: "상태 관리 및 성능 개선",
                content:
                [
                    "Redux Toolkit을 도입하여 복잡한 상태 관리를 효율적으로 관리",
                    "아토믹 디자인 패턴을 기반으로 UI 컴포넌트를 분리하고 재사용성을 높임"
                ]
            },
            {
                title: "API 연동 및 백엔드 협업",
                content:
                    "REST API 명세서를 바탕으로 비동기 데이터 처리 및 에러 핸들링을 구현"
            }
        ],
        previews: [
            {
                image: projectImages.wip,
                caption: "이미지"
            },
        ]
    }
}