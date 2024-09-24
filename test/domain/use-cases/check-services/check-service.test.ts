
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";
import { LogEntity } from "../../../../src/domain/entities/log.entities";


describe('check.service.ts CheckService use-case', () => {


    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsDate: jest.fn(),
        getLogsSeverityDate: jest.fn()
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(mockRespository, successCallback, errorCallback);
    const url = 'https://www.google.com';
    const url2 = 'https://www.11goolle123.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch is ok', async () => {

        const res = await checkService.execute(url);
        expect(res).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
       
        

    })

     test('should call errorCallback when fetch is not ok', async () => {
  
          const res = await checkService.execute(url2);
          expect(res).toBeFalsy();
          expect(res).toBe( false );
          expect(successCallback).not.toHaveBeenCalled();
          expect(errorCallback).toHaveBeenCalled();
          expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
      }) 
})

