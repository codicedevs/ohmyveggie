import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { Model } from "mongoose";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) public categoryModel: Model<CategoryDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }

  async findAll() {
    const response = await this.categoryModel.find({});
    const categories = response.map((c) => ({
      _id: c._id,
      name: c.name,
    }));
    return categories;
  }

  findOne(_id: number) {
    return this.categoryModel.find({ _id: _id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const response = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto
    );
    return response;
  }

  async remove(id: string) {
    const response = await this.categoryModel.findByIdAndDelete(id);
    return `Se borro la categoria ${id}`;
  }
}
