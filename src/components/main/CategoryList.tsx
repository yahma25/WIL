import { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { CategoryType } from '../../model/Category/Types';
import { Link } from 'gatsby';

export interface CategoryListProps {
  selectedCategory: CategoryType;
  categoryList: {
    [key: string]: number;
  };
}

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;
`;

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;

const CategoryItem = styled(({ to, ...props }: GatsbyLinkProps) => (
  <Link to={to} {...props} />
))`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }: GatsbyLinkProps) => (active ? '800' : '400')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          #{name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
