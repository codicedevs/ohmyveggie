import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "../services/app.service";
import { Admin } from "mongodb";
import { AdminGuard } from "src/guards/admin.guard";

let blockSite = false;

@Controller("")
export class AppController {
  constructor(private appService: AppService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("image"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.appService.uploadImageToCloudinary(file);

    return response.url;
  }
  // @UseGuards(AdminGuard)
  @Post("toggle-under-construction")
  async toggleUnderConstruction() {
    blockSite = !blockSite;
    return { status: blockSite };
  }

  @Get("is-under-construction")
  async isUnderConstruction() {
    return { status: blockSite };
  }
}
