-- 오늘의 쿼리
-- 모두 지워보자! 조건없이! 헉;;;
-- delete from 테이블명
delete from `friends`

-- 지운 후 입력하면 이전 데이터 개수 다음 번호가 입력됨
-- 데이터 이력이 지워지지 않음!
-- 완전 초기화 하려면 truncate table 테이블명
TRUNCATE TABLE `friends`

-- 전체 레코드 개수 구하기
SELECT COUNT(*) AS "전체개수" FROM `friends`