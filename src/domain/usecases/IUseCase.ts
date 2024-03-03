export type IResult<ResultSuccessPayload = object, ResultErrorCodes = void> =
  | {
      type: 'SUCCESS';
      payload: ResultSuccessPayload;
    }
  | {
      type: 'ERROR';
      code: ResultErrorCodes extends void
        ? 'FAILURE'
        : 'FAILURE' | ResultErrorCodes;
    };

export interface IUseCase<Req, Res extends IResult<any, any>> {
  execute(payload: Req): Promise<Res>;
}
