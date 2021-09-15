import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ArticleHeadInfoProps {
  title: string;
  date: string;
  categories: string[];
}

const ArticleHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px 20px;
  }
`;

const PrevPageIcon = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 45px;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const ArticleData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
`;

const ArticleHeadInfo: FunctionComponent<ArticleHeadInfoProps> = function ({
  title,
  date,
  categories,
}: ArticleHeadInfoProps) {
  const goBackPage = () => window.history.back();

  return (
    <ArticleHeadInfoWrapper>
      <PrevPageIcon onClick={goBackPage}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </PrevPageIcon>
      <Title>{title}</Title>
      <ArticleData>
        <div>{categories.join('/')}</div>
        <div>{date}</div>
      </ArticleData>
    </ArticleHeadInfoWrapper>
  );
};

export default ArticleHeadInfo;
