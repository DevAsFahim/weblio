import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filterByAuthor() {
    const queryObj = this?.query?.filter ? { author: this?.query?.filter } : {};

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    const sortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1;
    const sortValue = (this?.query?.sortBy as string) || 'createdAt';

    this.modelQuery = this.modelQuery.sort({ [sortValue]: sortOrder });

    return this;
  }
}

export default QueryBuilder;
