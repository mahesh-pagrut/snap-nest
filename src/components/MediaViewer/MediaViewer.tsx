"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Blend,
  ChevronLeft,
  ChevronDown,
  Crop,
  Info,
  Pencil,
  Trash2,
  Wand2,
  Image,
  Ban,
  PencilRuler,
  ScissorsSquare,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  Loader2,
} from "lucide-react";
import {formatBytes, addCommas} from '@/lib/utils'

import Container from "@/components/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CloudinaryResource } from "@/types/cloudinary";
import { CldImageProps, getCldImageUrl } from "next-cloudinary";
import  CldImage  from "@/components/CldImage"

interface Deletion {
  state: string;
}

const MediaViewer = ({ resource }: { resource: CloudinaryResource }) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const sheetFiltersRef = useRef<HTMLDivElement | null>(null);
  const sheetInfoRef = useRef<HTMLDivElement | null>(null);

  // Sheet / Dialog UI state, basically controlling keeping them open or closed

  const [filterSheetIsOpen, setFilterSheetIsOpen] = useState(false);
  const [infoSheetIsOpen, setInfoSheetIsOpen] = useState(false);
  const [deletion, setDeletion] = useState<Deletion>();


  const [version, setVersion] = useState<number>(1);
  const [enhancement, setEnhancement] = useState<string>();
  const [crop, setCrop] = useState<string>();
  const [filter, setFilter] = useState<string>();

  type Transformations = Omit<CldImageProps, "src" | "alt">;
  const transformations: Transformations = {};

  if (enhancement === "restore") {
    transformations.restore = true;
  } else if (enhancement === "improve") {
    transformations.improve = true;
  } else if (enhancement === "remove-background") {
    transformations.removeBackground = true;
  }

  if ( crop === 'square'){
    if (resource.width > resource.height) {
      transformations.height = resource.width;
    } else {
      transformations.width = resource.height;
    }
    transformations.crop = {
      source: true,
      type: 'fill'
    }
  } else if ( crop === 'landscape') {
    transformations.height = Math.floor(resource.width / (16/9))
    transformations.crop = {
      source: true,
      type: 'fill'
    }
  } else if( crop == 'portrait' ) {
    transformations.width = Math.floor(resource.height / (5/4))
      transformations.crop = {
        source: true,
        type: 'fill'
    }
  }
  

  if ( typeof filter === 'string' && ['grayscale', 'sepia', 'sharpen'].includes(filter)){
    transformations[filter as keyof Transformations] = true
  } else if ( typeof filter === 'string' && ['sizzle', 'frost'].includes(filter)){
    transformations.art = filter;
  }

  const hasTransformations = Object.entries(transformations).length > 0;

  // Canvas sizing based on the image dimensions. The tricky thing about
  // showing a single image in a space like this in a responsive way is trying
  // to take up as much room as possible without distorting it or upscaling
  // the image. Since we have the resource width and height, we can dynamically
  // determine whether it's landscape, portrait, or square, and change a little
  // CSS to make it appear centered and scalable!

  const canvasHeight = transformations.height || resource.height;
  const canvasWidth = transformations.width || resource.width;

  const isSquare = canvasHeight === canvasWidth;
  const isLandscape = canvasWidth > canvasHeight;
  const isPortrait = canvasHeight > canvasWidth;

  const imgStyles: Record<string, string | number> = {};

  if (isLandscape) {
    imgStyles.maxWidth = resource.width;
    imgStyles.width = "100%";
    imgStyles.height = "auto";
  } else if (isPortrait || isSquare) {
    imgStyles.maxHeight = resource.height;
    imgStyles.height = "100vh";
    imgStyles.width = "auto";
  }

  /**
   * closeMenus
   * @description Closes all panel menus and dialogs
   */

  function closeMenus() {
    setFilterSheetIsOpen(false);
    setInfoSheetIsOpen(false);
    setDeletion(undefined);
  }

  // discard changes

  function discardChanges(){
    setEnhancement(undefined);
    setCrop(undefined);
    setFilter(undefined);
    }

  // handleOnDeletionOpenChange

  function handleOnDeletionOpenChange(isOpen: boolean) {
    // Reset deletion dialog if the user is closing it
    if (!isOpen) {
      setDeletion(undefined);
    }
  }


// handleOnSave
  async function handleOnSave(){
    const url = getCldImageUrl({
      width: resource.width,
      height: resource.height,
      src: resource.public_id,
      format: 'default',
      quality: 'default',
      ...transformations
    });


    await fetch(url);

    const results = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        publicId: resource.public_id,
        url
      })
    }).then(r => r.json())
    invalidateQueries()

    closeMenus();
    discardChanges();
    setVersion(Date.now());

    console.log('url', url)
    console.log('results', results)
  }
  // handleSaveOnCopy
  async function handleOnSaveCopy(){
    const url = getCldImageUrl({
      width: resource.width,
      height: resource.height,
      src: resource.public_id,
      format: 'default',
      quality: 'default',
      ...transformations
    });

    await fetch(url);

    const {data} = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    }).then(r => r.json())
    invalidateQueries()

    router.push(`/resources/${data.asset_id}`)
  }

  async function handleOnDelete(){
    if ( deletion?.state === 'deleting'){
      return ;
    }
    setDeletion({
      state:"deleting"
    })
    await fetch('/api/delete',{
      method:'POST',
      body: JSON.stringify({
        publicId:resource.public_id
      })
    })
    invalidateQueries()
    router.push('/');
  }

  function invalidateQueries(){
    queryClient.invalidateQueries({
      queryKey: ['resources', String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)]
    })
  }



  // Listen for clicks outside of the panel area and if determined
  // to be outside, close the panel. This is marked by using
  // a data attribute to provide an easy way to reference it on
  // multiple elements

  useEffect(() => {
    document.body.addEventListener("click", handleOnOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOnOutsideClick);
    };
  }, []);

  function handleOnOutsideClick(event: MouseEvent) {
    const excludedElements = Array.from(
      document.querySelectorAll('[data-exclude-close-on-click="true"]')
    );
    const clickedExcludedElement =
      excludedElements.filter((element) =>
        event.composedPath().includes(element)
      ).length > 0;

    if (!clickedExcludedElement) {
      closeMenus();
    }
  }

  return (
    <div className="h-screen bg-black px-0">
      {/** Modal for deletion */}

      <Dialog
        open={deletion && ['confirm', "deleting"].includes(deletion.state)}
        onOpenChange={handleOnDeletionOpenChange}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to delete?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-center sm:justify-center">
            <Button variant="destructive"
            onClick={handleOnDelete}
            >
              {deletion?.state === 'deleting' && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {deletion?.state === 'deleting' && (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/** Edit panel for transformations and filters */}

      <Sheet modal={false} open={filterSheetIsOpen}>
        <SheetContent
          ref={sheetFiltersRef}
          className="w-full sm:w-3/4 grid grid-rows-[1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full bg-transparent p-0">
              <TabsTrigger value="enhance">
                <Wand2 />
                <span className="sr-only">Enhance</span>
              </TabsTrigger>
              <TabsTrigger value="crop">
                <Crop />
                <span className="sr-only">Crop & Resize</span>
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Blend />
                <span className="sr-only">Filters</span>
              </TabsTrigger>
            </TabsList>

            {/* enhancement functionlaties */}
            <TabsContent value="enhance">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Enhancements
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-3">
                {[
                  { key: "none", label: "None", icon: Ban },
                  { key: "improve", label: "Improve", icon: Wand2 },
                  { key: "restore", label: "Restore", icon: PencilRuler },
                  {
                    key: "remove-background",
                    label: "Remove Background",
                    icon: ScissorsSquare,
                  },
                ].map(({ key, label, icon: Icon }) => (
                  <li key={key}>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-3 text-left justify-start w-full h-14 border-2 bg-zinc-800 text-white 
        transition-all duration-200 hover:bg-zinc-700 hover:border-gray-400 
        ${
          enhancement === key
            ? "border-blue-500 bg-zinc-700 shadow-md"
            : "border-transparent"
        }`}
                      onClick={() => setEnhancement(key)}
                    >
                      <Icon className="w-5 h-5 text-gray-300" />
                      <span className="text-base font-medium">{label}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* cropping functionalities  */}
            <TabsContent value="crop">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Cropping & Resizing
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-3">
                  {[
                    { key: undefined, label: "Original", icon: Image },
                    { key: "square", label: "Square", icon: Square },
                    { key: "landscape", label: "Landscape", icon: RectangleHorizontal },
                    { key: "portrait", label: "Portrait", icon: RectangleVertical },
                  ].map(({ key, label, icon: Icon }) => (
                    <li key={label}>
                      <Button
                        variant="ghost"
                        className={`flex items-center gap-3 text-left justify-start w-full h-14 border-2 bg-zinc-800 text-white 
                        transition-all duration-200 hover:bg-zinc-700 hover:border-gray-400 
                        ${
                          crop === key
                            ? "border-blue-500 bg-zinc-700 shadow-md"
                            : "border-transparent"
                        }`}
                        onClick={() => setCrop(key)}
                      >
                        <Icon className="w-5 h-5 text-gray-300" />
                        <span className="text-base font-medium">{label}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
            </TabsContent>

            {/* filters functionalities */}
            <TabsContent value="filters">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <ul className="grid grid-cols-3 gap-2">
                {[
                  { key: undefined, label: "No Filter", filter: {} },
                  { key: "sepia", label: "Sepia", filter: { sepia: true } },
                  { key: "sizzle", label: "Sizzle", filter: { art: "sizzle" } },
                  { key: "frost", label: "Frost", filter: { art: "frost" } },
                  { key: "grayscale", label: "Grayscale", filter: { grayscale: true } },
                  { key: "sharpen", label: "Sharpen", filter: { sharpen: true } },
                ].map(({ key, label, filter: imgFilter }) => (
                  <li key={label}>
                    <button
                      className={`w-full border-2 bg-zinc-800 text-white transition-all duration-200 hover:bg-zinc-700 hover:border-gray-400 
                        ${
                          filter === key
                            ? "border-blue-500 bg-zinc-700 shadow-md"
                            : "border-transparent"
                        }`}
                      onClick={() => setFilter(key)}
                    >
                      <CldImage
                        width={120}
                        height={120}
                        crop="fill"
                        {...imgFilter}
                        src={resource.public_id}
                        alt={label}
                      />
                    </button>
                  </li>
                ))}
              </ul>

            </TabsContent>
          </Tabs>
          <SheetFooter className="gap-2 sm:flex-col">
            { hasTransformations && (
            <div className="grid grid-cols-[1fr_4rem] gap-2">
              {/* Save Button */}
              <Button
                variant="ghost"
                className="w-full h-14 text-white text-[1.01rem] flex justify-center items-center bg-blue-500 
                  transition-all duration-200 hover:bg-blue-600 rounded-xl shadow-md"
                  onClick={handleOnSave}
              >
                Save
              </Button>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-14 flex justify-center items-center bg-blue-500 text-white 
                      transition-all duration-200 hover:bg-blue-600 rounded-xl shadow-md"
                  >
                    <span className="sr-only">More Options</span>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-zinc-800 text-white border border-gray-700 shadow-lg rounded-lg"
                  data-exclude-close-on-click={true}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 px-4 py-3 text-[1.01rem] 
                        hover:bg-zinc-700 hover:text-blue-400 transition-all duration-200 
                        rounded-md cursor-pointer"
                        onClick={handleOnSaveCopy}
                    >
                      <span>Save as Copy</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            )}

            {/* Close Button */}
            <Button
                variant="outline"
                className={`w-full h-14 flex justify-center items-center rounded-xl shadow-md 
                  border border-zinc-600 transition-all duration-200 
                  hover:bg-zinc-700 hover:border-gray-400 
                  ${
                    hasTransformations
                      ? "text-red-400 hover:text-red-300"  // Highlight "Cancel" in red
                      : "text-white hover:text-gray-300"  // Keep "Close" neutral
                  }`}
                onClick={() => {
                  closeMenus();
                  discardChanges();
                }}
              >
                {hasTransformations ? "Cancel" : "Close"}
              </Button>
          </SheetFooter>

        </SheetContent>
      </Sheet>

      {/** Info panel for asset metadata */}

      <Sheet modal={false} open={infoSheetIsOpen}>
        <SheetContent
          ref={sheetInfoRef}
          className="w-full sm:w-3/4 grid grid-rows-[auto_1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <SheetHeader className="my-4">
            <SheetTitle className="text-zinc-200 font-semibold">
              Info
            </SheetTitle>
          </SheetHeader>
          <div>
            <ul>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  ID :
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.public_id}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Date Created :
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  { new Date (resource.created_at).toLocaleDateString()}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Width
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  { addCommas(resource.width)}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Height
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  { addCommas(resource.height)}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Format
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.format}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Size
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {formatBytes(resource.bytes)}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Tags
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.tags.join(', ')}
                </span>
              </li>
            </ul>
          </div>
          <SheetFooter>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={() => closeMenus()}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/** Asset Management Navbar */}
        <Container className="fixed z-10 top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-zinc-900 shadow-md rounded-lg">
          {/* Back Button */}
          <div className="flex items-center">
            <Link href="/" className="text-white flex items-center gap-2 text-lg font-medium p-3 hover:bg-zinc-800 rounded-md transition">
              <ChevronLeft className="h-5 w-5" />
              Back
            </Link>
          </div>

          {/* Action Buttons */}
          <ul className="flex items-center gap-4">
            <li>
              <Button
                variant="ghost"
                className="text-white p-3 hover:bg-zinc-800 hover:text-white rounded-lg transition"
                onClick={() => setFilterSheetIsOpen(true)}
              >
                <Pencil className="h-6 w-6" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-white p-3 hover:bg-zinc-800 hover:text-white rounded-lg transition"
                onClick={() => setInfoSheetIsOpen(true)}
              >
                <Info className="h-6 w-6" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-white p-3 hover:bg-zinc-800 hover:text-red-500 rounded-lg transition"
                onClick={() => setDeletion({ state: "confirm" })}
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </li>
          </ul>
        </Container>

      {/** Asset viewer */}

      <div className="relative flex justify-center items-center align-center w-full h-full">
        <CldImage
          key = {`${JSON.stringify(transformations)}-${version}`}
          className="object-contain"
          width={resource.width}
          height={resource.height}
          src={resource.public_id}
          alt={`Image ${resource.public_id}`}
          style={imgStyles}
          version={version}
          {...transformations}
        />
      </div>
    </div>
  );
};

export default MediaViewer;
